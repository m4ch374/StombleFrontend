import React from "react"
import { View } from "react-native"
import customTwMerge from "utils/CustomTwMerge"

const FieldSeperator: React.FC<{ classname?: string }> = ({
  classname = "",
}) => {
  return (
    <View
      className={customTwMerge("h-[1px] bg-gray-lighter/10 w-full", classname)}
    />
  )
}

export default FieldSeperator
