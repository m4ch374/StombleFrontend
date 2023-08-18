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
      className="w-full px-6 py-3 flex-row justify-between"
    >
      <Text className="font-Lato text-white text-xl">{children}</Text>
      <Text className="text-white text-xl">&gt;</Text>
    </TouchableOpacity>
  )
}

export default ModalSettingsBtn
