import React from 'react'
import { Icon, IconButton, useColorMode } from '@chakra-ui/react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'
import type { IconButtonProps } from '@chakra-ui/react'

const MenuButton = React.forwardRef((props: IconButtonProps, ref: React.Ref<HTMLButtonElement>) => {
  return <IconButton rounded="full" {...props} ref={ref} />
})
MenuButton.displayName = 'MenuButton'

const ColorModeButton = React.forwardRef<HTMLButtonElement, ColorModeButtonProps>(
  ({ color, onColorModeChange, ...props }, ref) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const onClick = () => {
      toggleColorMode()

      if (typeof onColorModeChange === 'function') {
        onColorModeChange()
      }
    }
    const isLight = colorMode === 'light'

    return (
      <MenuButton
        fontSize="3xl"
        {...props}
        ref={ref}
        onClick={onClick}
        colorScheme={isLight ? 'blue' : 'yellow'}
        icon={
          <Icon
            as={isLight ? HiOutlineMoon : HiOutlineSun}
            color={color ? color : isLight ? 'blue.500' : 'yellow.300'}
          />
        }
        aria-label="Color Mode"
      />
    )
  }
)
ColorModeButton.displayName = 'ColorModeButton'

type ColorModeButtonProps = Partial<IconButtonProps> & {
  onColorModeChange?: () => void
}

export { MenuButton, ColorModeButton }
