import React from "react"
import TIcon from "./_IconType"
import customTwMerge from "utils/CustomTwMerge"
import { Svg, Path } from "react-native-svg"

const FacebookIcon: React.FC<TIcon> = ({ classname }) => {
  return (
    <Svg
      className={customTwMerge("h-xl aspect-square", classname)}
      viewBox="0 0 48 48"
    >
      <Path
        d="M48 24C48 10.7452 37.2547 0 24 0C10.7452 0 0 10.7451 0 24C0 35.979 8.7765 45.9081 20.25 47.7084V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8331 9.375 29.3151 9.375C31.941 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6613C28.6796 15.75 27.75 17.6001 27.75 19.4981V24H34.4062L33.3422 30.9375H27.75V47.7084C39.2235 45.9081 48 35.9792 48 24Z"
        fill="#1877F2"
      />
      <Path
        d="M33.3422 30.9375L34.4062 24H27.75V19.4981C27.75 17.5999 28.6798 15.75 31.6613 15.75H34.6875V9.84375C34.6875 9.84375 31.941 9.375 29.3151 9.375C23.8331 9.375 20.25 12.6975 20.25 18.7125V24H14.1562V30.9375H20.25V47.7084C21.4905 47.9028 22.7443 48.0003 24 48C25.2557 48.0004 26.5095 47.9029 27.75 47.7084V30.9375H33.3422Z"
        fill="white"
      />
    </Svg>
  )
}

export default FacebookIcon
