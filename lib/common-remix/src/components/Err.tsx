import { Link } from '@remix-run/react'
import { Box, Button, Center, Heading, Icon, Stack } from '@chakra-ui/react'
import { HiArrowLeft, HiEmojiSad } from 'react-icons/hi'
import type { BoxProps, HeadingProps } from '@chakra-ui/react'

function Err({ children }: BoxProps) {
  return (
    <Center display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Stack spacing={6} textAlign="center" alignItems="center" justifyContent="center">
        <Box>
          <Icon as={HiEmojiSad} fontSize="144" color="red.500" />
        </Box>
        {children}
        <Button as={Link} leftIcon={<Icon as={HiArrowLeft} />} colorScheme="sky" variant="solid" maxW="sm" to="/">
          Go home
        </Button>
      </Stack>
    </Center>
  )
}

function Header(props: HeadingProps) {
  return <Heading as="h2" color="red.500" size="3xl" isTruncated {...props} />
}

function Content(props: BoxProps) {
  return <Box {...props} />
}

Err.Header = Header
Err.Content = Content

export { Err }
