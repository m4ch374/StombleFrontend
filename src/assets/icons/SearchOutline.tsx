import React from "react"
import TIcon from "./_IconType"
import customTwMerge from "utils/CustomTwMerge"
import { Svg, Path } from "react-native-svg"

const SearchOutline: React.FC<TIcon> = ({ classname }) => {
  return (
    <Svg
      className={customTwMerge("h-xl aspect-square", classname)}
      viewBox="0 0 24 24"
    >
      <Path
        d="M17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11Z"
        stroke="gray"
        strokeWidth="1.5"
      />
      <Path
        d="M18.4697 19.5303C18.7626 19.8232 19.2374 19.8232 19.5303 19.5303C19.8232 19.2374 19.8232 18.7626 19.5303 18.4697L18.4697 19.5303ZM14.9697 16.0303L18.4697 19.5303L19.5303 18.4697L16.0303 14.9697L14.9697 16.0303Z"
        fill="gray"
      />
      <Path
        d="M11 8C14 8 14 11 14 11"
        stroke="gray"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SearchOutline
