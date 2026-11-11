import { renderToString } from 'react-dom/server'

import { app } from '@/api'

app.get('*', (c) => {
  return c.html(
    `<!doctype html>${renderToString(
      <html lang="ja">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <title>Hono🔥 React</title>
          {import.meta.env.PROD && <link rel="stylesheet" href="/static/main.css" />}
          <script type="module" src={import.meta.env.PROD ? '/static/main.js' : '/src/main.tsx'} />
        </head>
        <body>
          <div id="root" />
        </body>
      </html>,
    )}`,
  )
})

export default app
