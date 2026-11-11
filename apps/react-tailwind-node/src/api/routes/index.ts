import { createRoute, z } from '@hono/zod-openapi'

export const MessageSchema = z
  .object({ message: z.string().openapi({ description: 'メッセージの本文' }) })
  .readonly()
  .openapi({
    required: ['message'],
    description: '挨拶のメッセージ。',
    example: { message: 'Hono🔥' },
  })
  .openapi('Message')

export const InternalServerProblemSchema = z
  .object({
    type: z
      .literal('/problems/internal-server-error')
      .openapi({
        description: 'problem type 識別子（相対 URI 参照。API のベース URI から解決される）',
      }),
    title: z
      .literal('サーバー内部エラー')
      .openapi({ description: 'problem type の短い人間可読なまとめ' }),
    status: z
      .literal(500)
      .openapi({ description: 'HTTP ステータスコード。RFC 9457 に従いボディにも再掲する' }),
    detail: z.string().openapi({ description: 'この発生事象に固有の人間可読な説明' }),
    instance: z
      .string()
      .openapi({ description: 'この発生事象を識別する URI 参照（リクエストパス）' }),
  })
  .readonly()
  .openapi({
    required: ['type', 'title', 'status', 'detail', 'instance'],
    description: '契約違反やその他の想定外のサーバー障害を表す RFC 9457 Problem Details。',
    example: {
      type: '/problems/internal-server-error',
      title: 'サーバー内部エラー',
      status: 500,
      detail: '予期しないエラーが発生しました。',
      instance: '/api/hello',
    },
  })
  .openapi('InternalServerProblem')

export const getHelloRoute = createRoute({
  method: 'get',
  path: '/hello',
  tags: ['hello'],
  description: '挨拶のメッセージを返す。',
  operationId: 'readHello',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: MessageSchema } },
    },
    500: {
      description: '500 Internal Server Error（`application/problem+json`）。app.onError が返す',
      content: { 'application/problem+json': { schema: InternalServerProblemSchema } },
    },
  },
} as const)
