// Code copied elsewhere
// TODO: lint code

import { Text, TouchableOpacity } from "react-native"

type FlatButtonProps = {
  height?: string | number | undefined
  bgColor?: string
  text: string
  onPress: () => void
  disabled?: boolean
  variation?: "filled" | "outlined"
}

const FlatButton = ({
  height,
  text,
  onPress,
  disabled,
  bgColor,
  variation,
}: FlatButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-[5px] justify-center items-center 
      ${disabled ? "bg-btnDisabled" : bgColor || "bg-btnActive"} 
      ${height ? height : "h-[48px]"} 
      ${variation === "outlined" && "border border-textSec bg-transparent"}`}
      disabled={disabled}
    >
      <Text
        className={`text-[17px] 
       ${variation === "outlined" ? " text-textSec " : "text-white"}`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default FlatButton
