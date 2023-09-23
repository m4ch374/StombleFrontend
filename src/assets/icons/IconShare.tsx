import React from "react"
import TIcon from "./_IconType"
import customTwMerge from "utils/CustomTwMerge"
import { Svg, Path } from "react-native-svg"

const IconShare: React.FC<TIcon> = ({ classname }) => {
  return (
    <Svg
      className={customTwMerge("h-xl aspect-square", classname)}
      viewBox="0 0 30 28"
    >
      <Path
        d="M29.5132 10.0124L19.2004 0.852621C18.2977 0.0507583 16.875 0.701711 16.875 1.94732V6.77194C7.46315 6.88277 0 8.82297 0 17.9973C0 21.7002 2.3192 25.3686 4.88279 27.2865C5.68278 27.885 6.82289 27.1338 6.52793 26.1636C3.87106 17.424 7.78811 15.1038 16.875 14.9694V20.2678C16.875 21.5154 18.2988 22.1634 19.2004 21.3625L29.5132 12.2018C30.1618 11.6255 30.1627 10.5895 29.5132 10.0124Z"
        fill="white"
      />
    </Svg>
  )
}

export default IconShare
