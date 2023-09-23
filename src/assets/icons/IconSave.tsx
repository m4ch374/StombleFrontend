import React from "react"
import { TColoredIcon } from "./_IconType"
import customTwMerge from "utils/CustomTwMerge"
import { Svg, Path } from "react-native-svg"

const IconSave: React.FC<TColoredIcon> = ({ classname, color = "white" }) => {
  return (
    <Svg
      className={customTwMerge("h-xl aspect-square", classname)}
      viewBox="0 0 22 30"
    >
      <Path
        d="M18 0H4C1 0 0 1 0 4V29C0 30.5 2 30 3 29L10 23C10.5 22.5 11.5 22.5 12 23L19 29C20 30 22 30.5 22 29V4C22 1 21 0 18 0Z"
        fill={color}
      />
    </Svg>
  )
}

export default IconSave
