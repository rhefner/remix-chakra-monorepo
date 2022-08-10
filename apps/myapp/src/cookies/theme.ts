import { theme } from '~/theme'

export const chakraColorModeCookieKey = 'myapp-theme'

export function parseChakraColorModeCookie(request: Request) {
  const cookie = request.headers.get('Cookie')
  return cookie?.match(new RegExp(`(^| )${chakraColorModeCookieKey}=([^;]+)`))?.[2] ?? theme.config.initialColorMode
}

export function setChakraColorModeCookie(theme: string) {
  return `${chakraColorModeCookieKey}=${theme}; Max-Age=31536000; Path=/; SameSite=lax; HttpOnly`
}
