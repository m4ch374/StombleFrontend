import React from "react"
import { TouchableOpacity } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import CustomColor from "constants/Colors"
import LatoText from "components/styled_components/LatoText"

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
      className="w-full px-md py-sm flex-row justify-between"
    >
      <LatoText classname="text-xl">{children}</LatoText>
      <AntDesign name="right" size={18} color={CustomColor.white} />
    </TouchableOpacity>
  )
}

export default ModalSettingsBtn
