import React from "react"
import { Text } from "react-native"
import customTwMerge from "utils/CustomTwMerge"

type TLatoText = {
  classname?: string
  children?: string | JSX.Element | JSX.Element[]
}

const LatoText: React.FC<TLatoText> = ({ classname = "", children = "" }) => {
  return (
    <Text
      className={customTwMerge("text-white font-lato text-base", classname)}
    >
      {children}
    </Text>
  )
}

export default LatoText
