// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const { colors } = require("../../style.config")

// Excluding default tw colors
type GrayScale = {
  lightest: string
  lighter: string
  mid: string
  darkest: string
  "darkest-pro-max": string
}

type UtilColors = {
  error: string
  success: string
  alert: string
  banner: string
}

type ColorType = {
  white: string
  gray: GrayScale

  background: string
  navbar: string
  primary: string
  secondary: string

  util: UtilColors
}

// The necessary evil
const CustomColor: ColorType = { ...colors } as ColorType

// Copy of the object
export default CustomColor

export type { ColorType }
