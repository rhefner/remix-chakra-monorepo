import React from 'react'
import { CacheProvider } from '@emotion/react'
import { ClientStyleContext } from './context.client'
import { createEmotionCache } from '@myorg/common-remix'

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = React.useState(createEmotionCache())

  function reset() {
    setCache(createEmotionCache())
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  )
}

export function RemixWrapper({ children }) {
  return (
    <React.StrictMode>
      <ClientCacheProvider>{children}</ClientCacheProvider>
    </React.StrictMode>
  )
}

interface ClientCacheProviderProps {
  children: React.ReactNode
}
