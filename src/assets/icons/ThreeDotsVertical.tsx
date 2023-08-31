import React from "react"
import TIcon from "./_IconType"
import customTwMerge from "utils/CustomTwMerge"
import { Svg, Path } from "react-native-svg"

const ThreeDotsVertical: React.FC<TIcon> = ({ classname }) => {
  return (
    <Svg
      className={customTwMerge("h-xl aspect-square", classname)}
      viewBox="0 0 24 24"
    >
      <Path
        d="M12 6.7397C12.9684 6.7397 13.7534 5.95468 13.7534 4.9863C13.7534 4.01793 12.9684 3.23291 12 3.23291C11.0316 3.23291 10.2466 4.01793 10.2466 4.9863C10.2466 5.95468 11.0316 6.7397 12 6.7397Z"
        fill="white"
      />
      <Path
        d="M12 13.7534C12.9684 13.7534 13.7534 12.9683 13.7534 12C13.7534 11.0316 12.9684 10.2466 12 10.2466C11.0316 10.2466 10.2466 11.0316 10.2466 12C10.2466 12.9683 11.0316 13.7534 12 13.7534Z"
        fill="white"
      />
      <Path
        d="M12 20.767C12.9684 20.767 13.7534 19.982 13.7534 19.0136C13.7534 18.0453 12.9684 17.2603 12 17.2603C11.0316 17.2603 10.2466 18.0453 10.2466 19.0136C10.2466 19.982 11.0316 20.767 12 20.767Z"
        fill="white"
      />
    </Svg>
  )
}

export default ThreeDotsVertical
