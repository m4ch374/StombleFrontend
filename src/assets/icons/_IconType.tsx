import { ClassNameValue } from "tailwind-merge"

type TIcon = {
  classname?: string | ClassNameValue[]
}

type TColoredIcon = {
  color?: string
} & TIcon

export default TIcon
export type { TColoredIcon }
