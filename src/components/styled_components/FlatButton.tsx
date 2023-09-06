// Code copied elsewhere
// TODO: lint code

import { TouchableOpacity } from "react-native"
import LatoText from "./LatoText"

type FlatButtonProps = {
  height?: string | number | undefined
  bgColor?: string
  text: string
  onPress: () => void
  disabled?: boolean
}

const FlatButton = ({
  height,
  text,
  onPress,
  disabled,
  bgColor,
}: FlatButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-[5px] justify-center items-center ${
        disabled ? "bg-gray-darkest " : bgColor || "bg-primary"
      } ${height ? height : "h-[48px]"}`}
      disabled={disabled}
    >
      <LatoText classname="text-[18px] font-lato-bold">
        {text.toUpperCase()}
      </LatoText>
    </TouchableOpacity>
  )
}

export default FlatButton
