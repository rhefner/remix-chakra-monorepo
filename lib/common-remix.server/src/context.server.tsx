import React from 'react'

export interface ServerStyleContextData {
  key: string
  ids: Array<string>
  css: string
}

export const ServerStyleContext = React.createContext<null | ServerStyleContextData[]>(null)
