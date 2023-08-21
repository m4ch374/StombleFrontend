import { View, Text } from "react-native"
import React from "react"

type Props = {
  title: string
  children: React.ReactNode
}

const InputBlueBg = ({ title, children }: Props) => {
  return (
    <View>
      <Text className="text-white opacity-80">{title}</Text>
      <View className="flex flex-row bg-bgText h-[48px] w-full justify-between items-center px-4 my-2 mb-8 rounded-[5px]">
        {children}
      </View>
    </View>
  )
}

export default InputBlueBg
