import { createCookie } from '@remix-run/node'

export const userPrefsDefault: UserPrefsCookie = {
  tz: 'UTC',
}

export const userPrefsCookie = createCookie('myapp-prefs', {
  sameSite: 'lax',
  path: '/',
  httpOnly: true,
  secrets: ['foobarbaz'],
})

export async function parseUserPrefsCookie(request: Request): Promise<UserPrefsCookie> {
  const cookieHeader = request.headers.get('Cookie')
  return { ...userPrefsDefault, ...((await userPrefsCookie.parse(cookieHeader)) || {}) }
}

interface UserPrefsCookie {
  tz: string
}
