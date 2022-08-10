import React from 'react'
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from '@remix-run/react'
import {
  ChakraProvider,
  ColorModeScript,
  createCookieStorageManager,
  createLocalStorageManager,
  CSSReset,
} from '@chakra-ui/react'
import { withEmotionCache } from '@emotion/react'
import { ServerStyleContext } from '@myorg/common-remix.server'
import { ClientStyleContext } from '@myorg/common-remix.client'
import { Layout } from '~/components'
import { theme } from '~/theme'
import { chakraColorModeCookieKey } from '~/cookies/theme'

export const Document = withEmotionCache(({ children, cookies, title }: DocumentProps, emotionCache) => {
  const serverSyleData = React.useContext(ServerStyleContext ?? {})
  const clientStyleData = React.useContext(ClientStyleContext ?? {})
  const colorModeManager =
    typeof cookies === 'string'
      ? createCookieStorageManager(chakraColorModeCookieKey, cookies || '')
      : createLocalStorageManager(chakraColorModeCookieKey)
  const currentColorMode = colorModeManager.get() ?? theme.config.initialColorMode

  // Only executed on client
  React.useEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head
    // re-inject tags
    const tags = emotionCache.sheet.tags
    emotionCache.sheet.flush()
    tags.forEach((tag) => {
      ;(emotionCache.sheet as any)._insertTag(tag)
    })
    // reset cache to reapply global styles
    clientStyleData.reset()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <html lang="en" data-theme={currentColorMode} style={{ colorScheme: currentColorMode }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="My App" />
        <link rel="icon" href="/favicon.ico" type="image/png" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        {serverSyleData?.map(({ key, ids, css }) => (
          <style
            key={key}
            data-emotion={`${key} ${ids.join(' ')}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: css }}
          />
        ))}
      </head>
      <body className={`chakra-ui-${currentColorMode}`}>
        <CSSReset />
        <ColorModeScript type="cookie" initialColorMode={currentColorMode} storageKey={chakraColorModeCookieKey} />
        <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
          <Layout>{children}</Layout>
        </ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
})

interface DocumentProps {
  children: React.ReactNode
  cookies?: string
  title?: string
}
