import React from "react"
import { TColoredIcon } from "./_IconType"
import customTwMerge from "utils/CustomTwMerge"
import { Svg, Path } from "react-native-svg"

const LikedVideo: React.FC<TColoredIcon> = ({ classname, color = "white" }) => {
  return (
    <Svg
      className={customTwMerge("h-xl aspect-square", classname)}
      viewBox="0 0 16 16"
    >
      <Path
        d="M11.15 1C9.932 1 8.763 1.58856 8 2.51862C7.237 1.58856 6.068 1 4.85 1C2.694 1 1 2.7584 1 4.99637C1 7.74296 3.38 9.98093 6.985 13.3815L8 14.3333L9.015 13.3742C12.62 9.98093 15 7.74296 15 4.99637C15 2.7584 13.306 1 11.15 1ZM8.07 12.2988L8 12.3715L7.93 12.2988C4.598 9.16712 2.4 7.09628 2.4 4.99637C2.4 3.54314 3.45 2.45322 4.85 2.45322C5.928 2.45322 6.978 3.17257 7.349 4.16803H8.658C9.022 3.17257 10.072 2.45322 11.15 2.45322C12.55 2.45322 13.6 3.54314 13.6 4.99637C13.6 7.09628 11.402 9.16712 8.07 12.2988Z"
        fill={color}
      />
    </Svg>
  )
}

export default LikedVideo
