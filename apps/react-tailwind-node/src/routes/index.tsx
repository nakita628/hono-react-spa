import { createFileRoute } from '@tanstack/react-router'

import { useHello } from '@/hooks'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, refetch } = useHello()
  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold text-orange-500 underline">Hono🔥 React</h1>
      <button
        type="button"
        onClick={() => {
          void refetch()
        }}
        className="rounded bg-orange-500 px-4 py-2 font-bold text-white"
      >
        Get Message
      </button>
      <h1 className="text-xl font-bold">{data?.message}</h1>
    </div>
  )
}
