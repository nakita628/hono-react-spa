import { createFileRoute } from '@tanstack/react-router'

import { css } from '@/styled-system/css'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '4', padding: '8' })}>
      <h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>About</h1>
      <p>Hono🔥 が API と HTML を返し、React が画面を描く SPA です。Node.js で動きます。</p>
    </div>
  )
}
