import React from 'react'
import { Box, Container, useColorMode } from '@chakra-ui/react'
import { Header } from './Layout/Header'
import { chakraColorModeCookieKey } from '~/cookies/theme'
import type { ContainerProps } from '@chakra-ui/react'

export function Layout({ children, ...props }: LayoutProps) {
  const { colorMode } = useColorMode()

  // When the cookie-based color mode changes, update the localStorage equivalent so Catch/ErrorBoundary's can use them
  // since they don't have access to cookies. Until we find a better solution..
  React.useEffect(() => {
    const lsColorMode = localStorage.getItem(chakraColorModeCookieKey)

    if (colorMode !== lsColorMode) {
      localStorage.setItem(chakraColorModeCookieKey, colorMode)
    }
  }, [colorMode])

  return (
    <Container className="layout" maxW="144rem" {...props}>
      <Header />
      <Box as="main" px={4} mt={8} pb={4}>
        {children}
      </Box>
    </Container>
  )
}

type LayoutProps = ContainerProps
