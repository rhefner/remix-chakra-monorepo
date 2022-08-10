import { Outlet } from '@remix-run/react'

export default function All() {
  return <Outlet />
}

export { CatchBoundary, ErrorBoundary } from '@myorg/common-remix'
