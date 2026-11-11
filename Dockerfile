# syntax=docker/dockerfile:1
#
# Node で動くアプリ（apps/*-node）に共通の Dockerfile。どのアプリをビルドするかは APP で渡す。
# build context はリポジトリのルート（pnpm-lock.yaml と pnpm-workspace.yaml が要る）。
# ふだんは各アプリの package.json の script を使う:
#
#   pnpm --filter react-tailwind-node docker:build
#   pnpm --filter react-tailwind-node docker:start

# ベースイメージはタグに加えて digest でも固定する（同じ Dockerfile からは同じ中身ができる）。
# 更新は Dependabot（.github/dependabot.yml）が PR を出す。ビルド用と実行用の Debian は 13 でそろえる。
ARG PNPM_VERSION=11.28.11

# ---------------------------------------------------------------------------
# build: SPA（dist/static）とサーバー（dist/index.js）をビルドする
# ---------------------------------------------------------------------------
FROM node:26.13.0-trixie-slim@sha256:5adad64f9a1fca2d51972caa65983634c8a774eb300d72b20f7f2a0f60368072 AS build
ARG PNPM_VERSION
ARG APP
RUN test -n "${APP}" || { echo 'APP is required: --build-arg APP=<apps の下のディレクトリ名>' >&2; exit 1; } \
    && npm install --global --no-fund --no-audit "pnpm@${PNPM_VERSION}"
WORKDIR /repo

# 依存の解決に要るファイルだけを先に置く。
# ソースだけを変えたビルドでは、ここから install までの layer がキャッシュから使われる。
# install 時の prepare（panda codegen）が設定を読むので、Panda のアプリでは panda.config.ts も置く
# （`[s]` は「無くてもエラーにしない」ための書き方）。
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/${APP}/package.json apps/${APP}/panda.config.t[s] apps/${APP}/

# lockfile どおりに入れる（ずれていたら失敗する）。pnpm の store はビルド間で使い回す。
RUN --mount=type=cache,target=/pnpm-store \
    pnpm install --frozen-lockfile --store-dir /pnpm-store --filter "${APP}"

COPY apps/${APP} apps/${APP}/
RUN pnpm --filter "${APP}" build

# ---------------------------------------------------------------------------
# runtime: Node だけが入った distroless（シェルもパッケージマネージャーも無い）で動かす
# サーバーは依存をすべてバンドル済みなので、コピーするのは dist だけ（node_modules は要らない）。
# ---------------------------------------------------------------------------
FROM gcr.io/distroless/nodejs24-debian13:nonroot@sha256:088a01637f22908632ba09018be2e0b516f2fa6f7869c191d29491139db43c78 AS runtime
ARG APP
# 待ち受けるポートは環境変数で変えられる（`docker run -e PORT=3000 -p 3000:3000`）。
ENV NODE_ENV=production \
    PORT=8787
WORKDIR /app

# 所有者は root のまま。実行ユーザー（nonroot）からは読めるが書き換えられない。
COPY --from=build /repo/apps/${APP}/dist ./dist

# root では動かさない（distroless の nonroot ユーザー）。
# 名前ではなく数字で書くと、Kubernetes の runAsNonRoot でも root でないと判定できる。
USER 65532:65532
EXPOSE 8787

# curl が無いので Node で確かめる。API が 200 を返せば healthy。
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD ["/nodejs/bin/node", "-e", "fetch(`http://127.0.0.1:${process.env.PORT}/api/hello`).then((r) => process.exit(r.ok ? 0 : 1), () => process.exit(1))"]

# イメージから、元のリポジトリとコミットをたどれるようにする。
# 値がビルドごとに変わるので、キャッシュを壊さないよう最後に置く。
ARG GIT_REVISION=unknown
ARG BUILD_DATE=unknown
LABEL org.opencontainers.image.title="${APP}" \
      org.opencontainers.image.description="Hono API + React SPA on Node.js" \
      org.opencontainers.image.source="https://github.com/nakita628/hono-react-spa" \
      org.opencontainers.image.revision="${GIT_REVISION}" \
      org.opencontainers.image.created="${BUILD_DATE}"

# ENTRYPOINT はベースイメージの node。シェルを挟まないので、`docker stop` の SIGTERM が
# そのままサーバーに届き、処理中のリクエストを終えてから止まる。
CMD ["dist/index.js"]
