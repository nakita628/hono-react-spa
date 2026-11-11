import { createFileRoute } from '@tanstack/react-router'

import { useHello } from '@/hooks'
import { css } from '@/styled-system/css'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, refetch } = useHello()
  return (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '4', padding: '8' })}>
      <h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>Hono🔥 React</h1>
      <button
        type="button"
        onClick={() => {
          void refetch()
        }}
      >
        Get Message
      </button>
      <h1 className={css({ fontSize: 'xl', fontWeight: 'bold' })}>{data?.message}</h1>
    </div>
  )
}
