import React from "react"
import { TouchableOpacity, Text } from "react-native"

type TModalSettingsBtn = {
  children: string | JSX.Element | JSX.Element[]
  onPress?: () => void
}

const ModalSettingsBtn: React.FC<TModalSettingsBtn> = ({
  children,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full py-md flex-row justify-center"
    >
      <Text className="lato-text font-lato-bold text-lg">{children}</Text>
    </TouchableOpacity>
  )
}

export default ModalSettingsBtn
