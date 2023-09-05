import React from "react"
import TIcon from "./_IconType"
import customTwMerge from "utils/CustomTwMerge"
import { Svg, Path } from "react-native-svg"

const NotificationOutline: React.FC<TIcon> = ({ classname }) => {
  return (
    <Svg
      className={customTwMerge("h-xl aspect-square", classname)}
      viewBox="0 0 24 24"
    >
      <Path
        d="M10 17.5L5 17.5001C9.73945 14.6565 5.4937 7.3206 10.9999 6.5635M10 17.5C10 18.5 11 19.5 12 19.5C13 19.5 14 18.5 14 17.5M10 17.5H14M14 17.5L19 17.5001C14.2607 14.6564 18.5059 7.32059 13 6.5635M13 6.5635C12.6972 6.52186 12.3648 6.50012 11.9998 6.50012C11.635 6.50013 11.3027 6.52187 10.9999 6.5635M13 6.5635C13 5.5 13 4.5 11.9998 4.5C10.9997 4.5 11 5.5 10.9999 6.5635M16 5.5C17 6.50012 18 7.5 18 10.5M8 5.5C7 6.5 6 7.5 6 10.5"
        stroke="gray"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default NotificationOutline
