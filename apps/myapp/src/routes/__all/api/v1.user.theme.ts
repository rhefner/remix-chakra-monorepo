import { json } from '@remix-run/node'
import { setChakraColorModeCookie } from '~/cookies/theme'
import type { ActionFunction } from '@remix-run/node'

export const action: ActionFunction = async ({ request }) => {
  const requestText = await request.text()
  const form = new URLSearchParams(requestText)
  const newTheme = form.get('theme')

  if (newTheme === null) {
    const message = `Parameter 'theme' is required`
    console.error(`[v1.user.theme:action] ${message}`)
    return json({ success: false, message })
  }

  // Persist the changes to the color mode
  // https://github.com/chakra-ui/chakra-ui/blob/4f2807e4195f5a7de1ad9946540fba8590ac42da/packages/color-mode/src/storage-manager.ts
  return json(
    {
      success: true,
    },
    {
      headers: {
        'Set-Cookie': setChakraColorModeCookie(newTheme),
      },
    }
  )
}
