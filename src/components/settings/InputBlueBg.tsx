import { View } from "react-native"
import React from "react"
import LatoText from "components/styled_components/LatoText"
import { Type } from "types/variantStyle"

type Props = {
  title: string
  userInfo?: string
  placeholder?: string
  variant: Type
  children: React.ReactNode
}

const InputBlueBg = ({
  title,
  userInfo,
  placeholder,
  variant,
  children,
}: Props) => {
  return (
    <View>
      <LatoText classname="text-gray-lightest text-sm mb-4">{title}</LatoText>
      <View
        className={`flex flex-row h-[48px] w-full justify-between items-center px-8 py-6 rounded-md
        ${variant === Type.filled ? "bg-navbar" : "border border-gray-mid"}
  `}
      >
        <LatoText
          classname={`${userInfo ? "text-white" : "text-gray-lighter"}`}
        >
          {userInfo || placeholder}
        </LatoText>
        {children}
      </View>
    </View>
  )
}

export default InputBlueBg
