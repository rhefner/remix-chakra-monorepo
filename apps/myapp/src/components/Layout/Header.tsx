import React from 'react'
import { Link } from '@remix-run/react'
import {
  Badge,
  Box,
  ButtonGroup,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
} from '@chakra-ui/react'
import { HiCog } from 'react-icons/hi'
import { ColorModeButton } from '~/components'
import { useColorModeToggle } from '~/hooks'
import { version } from '../../../package.json'
import type { ButtonGroupProps, GridProps, StackProps } from '@chakra-ui/react'

export function Header(props: HeaderProps) {
  return (
    <Grid as="nav" templateColumns="1fr 2fr 1fr" alignItems="flex-start" pb={4} mb={4} {...props}>
      <Flex align="center" justify="flex-start" gap={4}>
        <LeftMenu />
      </Flex>
      <Flex direction="column" align="center" justify="flex-start" gap={4}>
        <Logo />
      </Flex>
      <Flex align="center" justify="flex-end" gap={4}>
        <RightMenu />
      </Flex>
    </Grid>
  )
}

function MenuButtons(props: ButtonGroupProps) {
  return <ButtonGroup variant="ghost" colorScheme="gray" rounded="lg" p={2} zIndex="1" {...props} />
}

function SettingsMenuButton() {
  return (
    <Menu>
      <MenuButton as={IconButton} colorScheme="gray" rounded="full" aria-label="Settings" pt="1">
        <Icon as={HiCog} color="gray" aria-label="Settings" fontSize="3xl" />
      </MenuButton>
      <MenuList>
        <MenuItemOption onClick={() => alert('Hello World!')}>Hello World!</MenuItemOption>
      </MenuList>
    </Menu>
  )
}

function Logo(props: StackProps) {
  return (
    <Flex position="relative" justify="center" align="center" data-testid="header-logo" {...props}>
      <HStack justify="center" align="center">
        <Heading as="h1" fontSize="lg" ml="0">
          <ChakraLink as={Link} to={{ pathname: '/', search: '' }}>
            MyApp
          </ChakraLink>
        </Heading>
        <Box position="absolute" right="0" bottom="-5">
          <Badge colorScheme="blue" rounded="full" textTransform="lowercase">
            v{version}
          </Badge>
        </Box>
      </HStack>
    </Flex>
  )
}

function LeftMenu({ children, ...props }: React.PropsWithChildren<ButtonGroupProps>) {
  const toggleColorMode = useColorModeToggle()

  return (
    <MenuButtons {...props}>
      <ColorModeButton onColorModeChange={toggleColorMode} />
      {children}
    </MenuButtons>
  )
}

function RightMenu({ children, ...props }: React.PropsWithChildren<ButtonGroupProps>) {
  return (
    <MenuButtons {...props}>
      {children}
      <SettingsMenuButton />
    </MenuButtons>
  )
}

type HeaderProps = GridProps
