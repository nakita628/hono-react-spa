import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold text-orange-500 underline">About</h1>
      <p>Hono🔥 が API と HTML を返し、React が画面を描く SPA です。Node.js で動きます。</p>
    </div>
  )
}
