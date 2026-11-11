import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { css } from '@/styled-system/css'

const linkClass = css({ '&.active': { fontWeight: 'bold' } })

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => (
    <>
      <nav
        className={css({
          display: 'flex',
          gap: '4',
          borderBottomWidth: '1px',
          paddingInline: '8',
          paddingBlock: '4',
        })}
      >
        <Link to="/" className={linkClass}>
          Home
        </Link>
        <Link to="/about" className={linkClass}>
          About
        </Link>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
