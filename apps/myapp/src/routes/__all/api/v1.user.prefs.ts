import { json, redirect } from '@remix-run/node'
import { userPrefsCookie, userPrefsDefault } from '~/cookies/user-prefs.server'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('Cookie')
  const currentUserPrefs = { ...userPrefsDefault, ...((await userPrefsCookie.parse(cookieHeader)) || {}) }

  return json(currentUserPrefs)
}

export const action: ActionFunction = async ({ request }) => {
  console.debug(`[v1.user.prefs:action] Fired!`)
  const cookieHeader = request.headers.get('Cookie')
  const formData = await request.formData()
  const _action = formData.get('_action') as string
  const tz = formData.get('tz') as string
  const currentUserPrefs = { ...userPrefsDefault, ...((await userPrefsCookie.parse(cookieHeader)) || {}), tz }
  const options = {
    headers: {
      'Set-Cookie': await userPrefsCookie.serialize(currentUserPrefs),
    },
  }
  const url = request.url

  console.debug(`[v1.user.prefs:action] url: ${url}`)

  if (_action === 'updateTz') {
    return redirect('/', options)
  }

  throw new Error(`[v1.user.prefs:action] Unexpected action!`)
}
