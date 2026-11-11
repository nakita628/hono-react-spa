import type { RouteHandler } from '@hono/zod-openapi'

import type { getHelloRoute } from '@/api/routes'
import { MessageSchema } from '@/api/routes'

/**
 * `GET /hello` ハンドラ。挨拶のメッセージを返す。
 *
 * ```mermaid
 * sequenceDiagram
 *   participant C as Client
 *   participant H as Handler
 *   C->>H: GET /hello
 *   H-->>C: 200 Message
 * ```
 */
export const getHelloRouteHandler: RouteHandler<typeof getHelloRoute> = (c) => {
  return c.json(MessageSchema.parse({ message: 'Hono🔥' }), 200)
}
