import React from "react"
import TIcon from "./_IconType"
import customTwMerge from "utils/CustomTwMerge"
import { Svg, Path, Rect, G, ClipPath, Defs } from "react-native-svg"

const SearchIcon: React.FC<TIcon> = ({ classname }) => {
  return (
    <Svg
      className={customTwMerge("h-xl aspect-square", classname)}
      viewBox="0 0 24 24"
    >
      <G clip-path="url(#clip0_6210_13532)">
        <Path
          d="M17.25 17.25L22.5 22.5"
          stroke="#808080"
          stroke-width="1.31249"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M1.5 10.5C1.5 15.4706 5.5294 19.5 10.4999 19.5C12.9895 19.5 15.243 18.4892 16.8723 16.8555C18.4961 15.2276 19.4998 12.981 19.4998 10.5C19.4998 5.52944 15.4704 1.5 10.4999 1.5C5.5294 1.5 1.5 5.52944 1.5 10.5Z"
          stroke="#808080"
          stroke-width="1.31249"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_6210_13532">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SearchIcon
