import React from "react"
import { TColoredIcon } from "./_IconType"
import customTwMerge from "utils/CustomTwMerge"
import { Svg, Path } from "react-native-svg"

const IconLike: React.FC<TColoredIcon> = ({ classname, color = "white" }) => {
  return (
    <Svg
      className={customTwMerge("h-xl aspect-square", classname)}
      viewBox="0 0 30 28"
    >
      <Path
        d="M2.78906 16.5148L13.377 27.303C13.8164 27.7506 14.3965 28 15 28C15.6035 28 16.1836 27.7506 16.623 27.303L27.2109 16.5148C28.9922 14.705 30 12.1662 30 9.51235V9.14145C30 4.67142 27.041 0.860056 23.0039 0.124643C20.332 -0.361369 17.6133 0.591471 15.7031 2.67621L15 3.44359L14.2969 2.67621C12.3867 0.591471 9.66797 -0.361369 6.99609 0.124643C2.95898 0.860056 0 4.67142 0 9.14145V9.51235C0 12.1662 1.00781 14.705 2.78906 16.5148Z"
        fill={color}
      />
    </Svg>
  )
}

export default IconLike
