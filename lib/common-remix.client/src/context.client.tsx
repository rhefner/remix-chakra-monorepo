import React from 'react'

export interface ClientStyleContextData {
  reset: () => void
}

export const ClientStyleContext = React.createContext<ClientStyleContextData>({
  reset: () => {},
})
