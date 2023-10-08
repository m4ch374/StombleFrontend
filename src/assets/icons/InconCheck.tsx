import React from "react"
import TIcon from "./_IconType"
import customTwMerge from "utils/CustomTwMerge"
import { Svg, Path } from "react-native-svg"

const IconCheck: React.FC<TIcon> = ({ classname }) => {
  return (
    <Svg
      className={customTwMerge("h-[10px] aspect-square", classname)}
      viewBox="0 0 9 7"
      fill="none"
    >
      <Path
        d="M1.5 4.5L3.50046 6.16743L7.5 1.5"
        stroke="#00CA23"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default IconCheck
