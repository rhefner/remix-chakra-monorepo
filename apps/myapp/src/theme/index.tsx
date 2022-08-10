import { mode } from '@chakra-ui/theme-tools'
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import colors from './colors'
import type { GlobalStyleProps, Styles } from '@chakra-ui/theme-tools'
import type { ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  cssVarPrefix: 'myapp',
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const styles: Styles = {
  global: (props: any) => ({
    body: {
      color: mode('zinc.800', 'whiteAlpha.900')(props),
      bg: mode('white', 'zinc.900')(props),
    },
    // div: {
    //   color: mode('zinc.800', 'whiteAlpha.900')(props),
    //   bg: mode('white', 'zinc.900')(props),
    // },
  }),
}

const components: any = {
  // Can get these by looking at the code - For example:
  // node_modules/.pnpm/@chakra-ui+react*/node_modules/@chakra-ui/theme/components/dist/chakra-ui-theme-components.cjs.dev.js
  Menu: {
    baseStyle: (props: GlobalStyleProps) => ({
      list: {
        bg: mode('zinc.50', 'zinc.800')(props),
      },
    }),
  },
  Modal: {
    baseStyle: (props: GlobalStyleProps) => ({
      dialog: {
        bg: mode('zinc.50', 'zinc.800')(props),
      },
    }),
  },
  Popover: {
    baseStyle: (props: GlobalStyleProps) => ({
      content: {
        bg: mode('zinc.50', 'zinc.800')(props),
      },
    }),
  },
  Table: {
    variants: {
      simple: (props: GlobalStyleProps) => ({
        td: {
          background: mode('white', 'zinc.900')(props),
          borderColor: mode('zinc.100', 'zinc.800')(props),
          padding: '0.5em',
        },
        th: {
          background: mode('zinc.100', 'zinc.800')(props),
          borderColor: mode('zinc.100', 'zinc.800')(props),
          padding: '1em 0.5em',
        },
      }),
    },
  },
}

const theme = extendTheme(
  {
    colors,
    components,
    config,
    styles,
  },
  withDefaultColorScheme({
    colorScheme: 'blue',
    // components: ['Box', 'Button', 'FormControl', 'Stat'],
  })
  // withDefaultVariant({
  //   variant: 'outline',
  //   components: ['Button'],
  // })
) as any

export { theme }
