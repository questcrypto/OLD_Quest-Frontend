import { createGlobalStyle } from 'styled-components'
import ProximaBold from 'assets/fonts/proxima/ProximaNovaBold.otf'
import ProximaThin from 'assets/fonts/proxima/ProximaNovaThin.otf'
import NunitoBold from 'assets/fonts/Nunito_Sans/NunitoSans-Bold.ttf'
import NunitoSemiBold from 'assets/fonts/Nunito_Sans/NunitoSans-SemiBold.ttf'
import NunitoRegular from 'assets/fonts/Nunito_Sans/NunitoSans-Regular.ttf'
import NunitoLight from 'assets/fonts/Nunito_Sans/NunitoSans-Light.ttf'

export interface Colors {
  themeBackground: string
  white: string
  primary: string
  textPrimary: string
  textSecondary: string
  paperBackground: string
  paperBackground2: string
  paperBackground3: string
  lightGray: string
  yellow: string
}

export const colors: Colors = {
  themeBackground: '#E5E5E5',
  white: '#FFFFFF',
  primary: '#1E3444',
  textPrimary: '#302E35',
  textSecondary: '#828282',
  paperBackground: '#FBFBFB',
  paperBackground2: '#F5F5F5',
  paperBackground3: '#FAFAFA',
  lightGray: '#E0E0E0',
  yellow: '#F2C94C',
}

export interface ThemeStarter {
  [propName: string]: string | undefined
  themeBackground: string
  white: string
  primary: string
  textPrimary: string
  textSecondary: string
  paperBackground: string
  paperBackground2: string
  paperBackground3: string
  lightGray: string
  yellow: string
}

export const theme: ThemeStarter = {
  themeBackground: colors.themeBackground,
  white: colors.white,
  primary: colors.primary,
  textPrimary: colors.textPrimary,
  textSecondary: colors.textSecondary,
  paperBackground: colors.paperBackground,
  paperBackground2: colors.paperBackground2,
  paperBackground3: colors.paperBackground3,
  lightGray: colors.lightGray,
  yellow: colors.yellow,
}

export interface ScreenSizes {
  mediaS: number
  mediaM: number
  mediaL: number
  mediaXL: number
  mediaXXL: number
}
export const screenSizes: ScreenSizes = {
  mediaS: 640,
  mediaM: 800,
  mediaL: 1024,
  mediaXL: 1280,
  mediaXXL: 1480,
}

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: ProximaBold;
  src: url(${ProximaBold});
}

@font-face {
  font-family: ProximaThin;
  src: url(${ProximaThin});
}

@font-face {
  font-family: ProximaRegular;
  src: url(${NunitoRegular});
}

@font-face {
  font-family: NunitoBold;
  src: url(${NunitoBold});
}
@font-face {
  font-family: NunitoSemiBold;
  src: url(${NunitoSemiBold});
}
@font-face {
  font-family: NunitoRegular; 
  src: url(${NunitoRegular});
}
@font-face {
  font-family: NunitoLight;
  src: url(${NunitoLight});
}


body {
  background: ${colors.themeBackground} !important
}

`
