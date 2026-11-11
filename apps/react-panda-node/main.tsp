import "@typespec/http";
import "@typespec/openapi";

using Http;
using OpenAPI;

@service(#{ title: "react-panda-node API" })
@info(#{ version: "1.0.0" })
namespace Api;

/** 挨拶のメッセージ。 */
@example(#{ message: "Hono🔥" })
model Message {
  /** メッセージの本文 */
  message: string;
}

/** 契約違反やその他の想定外のサーバー障害を表す RFC 9457 Problem Details。 */
@example(#{
  type: "/problems/internal-server-error",
  title: "サーバー内部エラー",
  status: 500,
  detail: "予期しないエラーが発生しました。",
  instance: "/api/hello",
})
model InternalServerProblem {
  /** problem type 識別子（相対 URI 参照。API のベース URI から解決される） */
  type: "/problems/internal-server-error";

  /** problem type の短い人間可読なまとめ */
  title: "サーバー内部エラー";

  /** HTTP ステータスコード。RFC 9457 に従いボディにも再掲する */
  status: 500;

  /** この発生事象に固有の人間可読な説明 */
  detail: string;

  /** この発生事象を識別する URI 参照（リクエストパス） */
  instance: string;
}

/** 500 Internal Server Error（`application/problem+json`）。app.onError が返す */
@error
model InternalServerProblemResponse {
  @statusCode statusCode: 500;
  @header contentType: "application/problem+json";
  @body body: InternalServerProblem;
}

@route("/hello")
@tag("hello")
namespace Hello {
  /** 挨拶のメッセージを返す。 */
  @get
  @operationId("readHello")
  op read(): Message | InternalServerProblemResponse;
}
