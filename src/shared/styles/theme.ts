import { createGlobalStyle } from 'styled-components'
import RobotoBold from 'assets/fonts/Roboto/Roboto-Bold.ttf'
import RobotoMediumBold from 'assets/fonts/Roboto/Roboto-Medium.ttf'
import RobotoRegular from 'assets/fonts/Roboto/Roboto-Regular.ttf'
import RobotoLight from 'assets/fonts/Roboto/Roboto-Light.ttf'
import RobotoThin from 'assets/fonts/Roboto/Roboto-Thin.ttf'

import NexaBold from 'assets/fonts/Nexa/NexaBold.otf'
import NexaRegular from 'assets/fonts/Nexa/NexaRegular.otf'
import NexaLight from 'assets/fonts/Nexa/NexaLight.otf'
import NexaThin from 'assets/fonts/Nexa/NexaThin.otf'

export interface Colors {
  themeBackground: string
  white: string
  primary: string
  textPrimary: string
  textSecondary: string
  paperBackground: string
  paperBackground2: string
  paperBackground3: string
  paperBackground4: string
  lightGray: string
  lightYellow: string
  greenColor: string
  darkRed: string
  gold: string
  cardbordercolor:string
}

export const colors: Colors = {
  themeBackground: '#E5E5E5',
  // themeBackground: '#FFFFFF',
  white: '#FFFFFF',
  primary: '#1E3444',
  textPrimary: '#302E35',
  textSecondary: '#828282',
  paperBackground: '#FBFBFB',
  paperBackground2: '#F5F5F5',
  paperBackground3: '#FAFAFA',
  paperBackground4: '#ECECEC',
  lightGray: '#E0E0E0',
  lightYellow: '#F2C94C',
  greenColor: '#219653',
  darkRed: '#bf4834',
  gold: '#E1B56F',
  cardbordercolor: "#DCDADA",
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
  paperBackground4: string
  lightGray: string
  lightYellow: string
  greenColor: string
  darkRed: string
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
  paperBackground4: colors.paperBackground4,
  lightGray: colors.lightGray,
  lightYellow: colors.lightYellow,
  greenColor: colors.greenColor,
  darkRed: colors.darkRed,
}

export interface ScreenSizes {
  mediaXS: number
  mediaS: number
  mediaM: number
  mediaL: number
  mediaXL: number
  mediaXXL: number
}
export const screenSizes: ScreenSizes = {
  mediaXS: 567,
  mediaS: 640,
  mediaM: 800,
  mediaL: 1024,
  mediaXL: 1280,
  mediaXXL: 1480,
}

export const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: RobotoBold;
  src: url(${RobotoBold});
}

@font-face {
  font-family: RobotoMediumBold;
  src: url(${RobotoMediumBold});
}

@font-face {
  font-family: RobotoRegular;
  src: url(${RobotoRegular});
}

@font-face {
  font-family: RobotoLight;
  src: url(${RobotoLight});
}
@font-face {
  font-family: RobotoThin;
  src: url(${RobotoThin});
}

@font-face {
  font-family: NexaBold;
  src: url(${NexaBold});
}

@font-face {
  font-family: NexaRegular;
  src: url(${NexaRegular});
}

@font-face {
  font-family: NexaLight;
  src: url(${NexaLight});
}
@font-face {
  font-family: NexaThin;
  src: url(${NexaThin});
}

body {
  /* background: ${colors.themeBackground} !important; */
  overflow-x: hidden;
}

* {
  font-family: NexaRegular !important;
}

::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #F5F5F5;
  border-radius: 8px;
}
::-webkit-scrollbar
{
  width: 8px;
  background-color: #FFFFFF;
}
::-webkit-scrollbar-thumb
{
  background-color: rgba(0, 0, 0, 0.7);
}
input[type=number] {
  -moz-appearance: textfield;
}

`
