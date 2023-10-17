import React from "react"
import TIcon from "./_IconType"
import customTwMerge from "utils/CustomTwMerge"
import { Svg, Path } from "react-native-svg"

const IconMore: React.FC<TIcon> = ({ classname }) => {
  return (
    <Svg
      className={customTwMerge("h-xl aspect-square", classname)}
      viewBox="0 0 30 8"
    >
      <Path
        d="M3.46154 7.5C2.54348 7.5 1.66303 7.13125 1.01386 6.47487C0.364697 5.8185 0 4.92826 0 4C0 3.07174 0.364697 2.1815 1.01386 1.52513C1.66303 0.868748 2.54348 0.5 3.46154 0.5C4.3796 0.5 5.26005 0.868748 5.90922 1.52513C6.55838 2.1815 6.92308 3.07174 6.92308 4C6.92308 4.92826 6.55838 5.8185 5.90922 6.47487C5.26005 7.13125 4.3796 7.5 3.46154 7.5ZM15 7.5C14.0819 7.5 13.2015 7.13125 12.5523 6.47487C11.9032 5.8185 11.5385 4.92826 11.5385 4C11.5385 3.07174 11.9032 2.1815 12.5523 1.52513C13.2015 0.868748 14.0819 0.5 15 0.5C15.9181 0.5 16.7985 0.868748 17.4477 1.52513C18.0968 2.1815 18.4615 3.07174 18.4615 4C18.4615 4.92826 18.0968 5.8185 17.4477 6.47487C16.7985 7.13125 15.9181 7.5 15 7.5ZM26.5385 7.5C25.6204 7.5 24.7399 7.13125 24.0908 6.47487C23.4416 5.8185 23.0769 4.92826 23.0769 4C23.0769 3.07174 23.4416 2.1815 24.0908 1.52513C24.7399 0.868748 25.6204 0.5 26.5385 0.5C27.4565 0.5 28.337 0.868748 28.9861 1.52513C29.6353 2.1815 30 3.07174 30 4C30 4.92826 29.6353 5.8185 28.9861 6.47487C28.337 7.13125 27.4565 7.5 26.5385 7.5Z"
        fill="white"
      />
    </Svg>
  )
}

export default IconMore