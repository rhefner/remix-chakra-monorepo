import { useCatch } from '@remix-run/react'
import { Err } from './Err'

export function CatchBoundary() {
  const caught = useCatch()
  let message = 'Unknown error'

  switch (caught.status) {
    case 401:
      message = 'Looks like you tried to visit a page that you do not have access to.'
      break
    case 404:
      message = 'Looks like you tried to visit a page that does not exist.'
      break
    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Err>
      <Err.Header>
        {caught.status} {caught.statusText}
      </Err.Header>
      <Err.Content>{message}</Err.Content>
    </Err>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Err>
      <Err.Header>...Oops!</Err.Header>
      <Err.Content>{String(error) || 'Unknown Error'}</Err.Content>
    </Err>
  )
}
