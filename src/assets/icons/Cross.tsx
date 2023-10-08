import React from "react"
import TIcon from "./_IconType"
import customTwMerge from "utils/CustomTwMerge"
import { Svg, Path } from "react-native-svg"

const Cross: React.FC<TIcon> = ({ classname }) => {
  return (
    <Svg
      className={customTwMerge("aspect-square h-[15px] w-[15px]", classname)}
      viewBox="0 0 16 16"
    >
      <Path
        d="M0.615372 0.615372C0.955237 0.275508 1.50627 0.275507 1.84613 0.615372L15.3845 14.1537C15.7243 14.4936 15.7243 15.0446 15.3845 15.3845C15.0446 15.7244 14.4936 15.7244 14.1537 15.3845L0.615372 1.84613C0.275508 1.50627 0.275507 0.955237 0.615372 0.615372Z"
        fill="white"
      />
      <Path
        d="M0.615503 15.3846C0.275638 15.0447 0.275639 14.4937 0.615504 14.1539L14.1539 0.615496C14.4937 0.275631 15.0447 0.275629 15.3846 0.615495C15.7245 0.95536 15.7245 1.50639 15.3846 1.84625L1.84626 15.3846C1.5064 15.7245 0.955368 15.7245 0.615503 15.3846Z"
        fill="white"
      />
    </Svg>
  )
}

export default Cross
