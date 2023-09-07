import { View } from "react-native"
import React from "react"
import LatoText from "components/styled_components/LatoText"
import { Type } from "types/variantStyle"

type Props = {
  title: string
  userInfo?: string
  variant: Type
  children: React.ReactNode
}

const InputBlueBg = ({ title, userInfo, variant, children }: Props) => {
  return (
    <View>
      <LatoText classname="text-gray-lighter text-sm">{title}</LatoText>
      <View
        className={`flex flex-row h-[48px] w-full justify-between items-center px-4 my-2 pb-2 rounded-md
        ${variant === Type.filled ? "bg-navbar" : "border border-gray-lighter"}
  `}
      >
        <LatoText classname="text-gray-lightest">{userInfo}</LatoText>
        {children}
      </View>
    </View>
  )
}

export default InputBlueBg
