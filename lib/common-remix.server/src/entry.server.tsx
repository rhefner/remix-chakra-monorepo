import { renderToString } from 'react-dom/server'
import { RemixServer } from '@remix-run/react'
import { Response } from '@remix-run/node'
import createEmotionServer from '@emotion/server/create-instance'
import { CacheProvider } from '@emotion/react'
import { createEmotionCache } from '@myorg/common-remix'
import { ServerStyleContext } from './context.server'
import type { EntryContext, Headers } from '@remix-run/node'

export function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  const html = renderToString(
    <ServerStyleContext.Provider value={null}>
      <CacheProvider value={cache}>
        <RemixServer context={remixContext} url={request.url} />
      </CacheProvider>
    </ServerStyleContext.Provider>
  )

  const chunks = extractCriticalToChunks(html)

  const markup = renderToString(
    <ServerStyleContext.Provider value={chunks.styles}>
      <CacheProvider value={cache}>
        <RemixServer context={remixContext} url={request.url} />
      </CacheProvider>
    </ServerStyleContext.Provider>
  )

  responseHeaders.set('Content-Type', 'text/html')

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
