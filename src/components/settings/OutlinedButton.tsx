import React from "react"
import { TouchableOpacity } from "react-native"
import LatoText from "components/styled_components/LatoText"

type Props = {
  text: string
  onPress: () => void
  colorTheme?: "default" | "red"
}

const OutlinedButton: React.FC<Props> = ({ onPress, colorTheme, text }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-md justify-center items-center border-2 ${
        colorTheme ? "border-red-600" : "border-primary"
      } h-[48px] w-full`}
    >
      <LatoText
        classname={`text-[16] font-lato-bold ${
          colorTheme ? "text-red-600" : "text-primary"
        }`}
      >
        {text}
      </LatoText>
    </TouchableOpacity>
  )
}

export default OutlinedButton
