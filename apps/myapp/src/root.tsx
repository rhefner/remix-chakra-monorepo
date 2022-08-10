import { json } from '@remix-run/node'
import { Outlet, useCatch, useLoaderData } from '@remix-run/react'
import { Box } from '@chakra-ui/react'
import { Err } from '@myorg/common-remix'
import { parseChakraColorModeCookie, setChakraColorModeCookie } from '~/cookies/theme'
import { parseUserPrefsCookie, userPrefsCookie } from '~/cookies/user-prefs.server'
import { Document } from '~/components'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'

const title = 'MyApp'

export const meta: MetaFunction = () => {
  return { title }
}

export const loader: LoaderFunction = async ({ request }) => {
  const cookies = request.headers.get('Cookie')
  const userPrefs = await parseUserPrefsCookie(request)
  const colorMode = parseChakraColorModeCookie(request)
  const options = {
    headers: [
      ['Set-Cookie', await userPrefsCookie.serialize(userPrefs)],
      ['Set-Cookie', setChakraColorModeCookie(colorMode)],
    ],
  }

  return json(
    {
      cookies,
      renderedAt: new Date(),
    },
    options
  )
}

export default function App() {
  const { cookies, renderedAt } = useLoaderData()

  return (
    <Document cookies={cookies}>
      <Outlet />
      <Box position="fixed" bottom="0" left="0" p="2" color="gray">
        Rendered at {renderedAt}
      </Box>
    </Document>
  )
}

export function RootCatchBoundary() {
  const caught = useCatch()
  let message = 'Unknown error'

  console.error(`[root:CatchBoundary] caught:`, caught)

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
    <Document title={`${caught.status} ${caught.statusText} | ${title}`}>
      <Err>
        <Err.Header>
          {caught.status} {caught.statusText}
        </Err.Header>
        <Err.Content>{message}</Err.Content>
      </Err>
    </Document>
  )
}

export function RootErrorBoundary({ error, ...args }: { error: Error }) {
  console.error(`[root:ErrorBoundary] Error:`, error, 'Args', args)

  return (
    <Document title={`Error! | ${title}`}>
      <Err>
        <Err.Header>...Oops!</Err.Header>
        <Err.Content>{String(error) || 'Unknown Error'}</Err.Content>
      </Err>
    </Document>
  )
}
