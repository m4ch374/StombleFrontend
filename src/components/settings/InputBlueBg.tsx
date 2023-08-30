import { View } from "react-native"
import React from "react"
import LatoText from "components/styled_components/LatoText"

type Props = {
  title: string
  children: React.ReactNode
}

const InputBlueBg = ({ title, children }: Props) => {
  return (
    <View>
      <LatoText classname="text-gray-lightest text-sm">{title}</LatoText>
      <View className="flex flex-row bg-navbar h-[48px] w-full justify-between items-center px-4 my-2 mb-8 rounded-sm">
        {children}
      </View>
    </View>
  )
}

export default InputBlueBg
