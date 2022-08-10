import { useFetcher } from '@remix-run/react'
import { useColorMode } from '@chakra-ui/react'

export function useColorModeToggle() {
  const { colorMode } = useColorMode()
  const colorModeFetcher = useFetcher()

  return () =>
    colorModeFetcher.submit(
      { theme: colorMode === 'light' ? 'dark' : 'light' },
      {
        action: `/api/v1/user/theme`,
        method: 'post',
      }
    )
}
