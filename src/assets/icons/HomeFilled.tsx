import React from "react"
import TIcon from "./_IconType"
import customTwMerge from "utils/CustomTwMerge"
import { Svg, Path } from "react-native-svg"

const HomeFilled: React.FC<TIcon> = ({ classname }) => {
  return (
    <Svg
      className={customTwMerge("h-xl aspect-square", classname)}
      viewBox="0 0 24 25"
    >
      <Path
        d="M18.9436 9.72647L13.792 5.53447C12.7853 4.71847 11.2122 4.71047 10.2133 5.52647L5.0617 9.72647C4.32238 10.3265 3.87407 11.5265 4.03137 12.4705L5.02237 18.5025C5.25046 19.8545 6.48528 20.9185 7.83021 20.9185H16.1672C17.4964 20.9185 18.7549 19.8305 18.9829 18.4945L19.9739 12.4625C20.1155 11.5265 19.6672 10.3265 18.9436 9.72647ZM12.5886 17.7185C12.5886 18.0465 12.3212 18.3185 11.9987 18.3185C11.6763 18.3185 11.4089 18.0465 11.4089 17.7185V15.3185C11.4089 14.9905 11.6763 14.7185 11.9987 14.7185C12.3212 14.7185 12.5886 14.9905 12.5886 15.3185V17.7185Z"
        fill="white"
      />
    </Svg>
  )
}

export default HomeFilled
