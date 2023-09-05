import React from "react"
import TIcon from "./_IconType"
import customTwMerge from "utils/CustomTwMerge"
import { Svg, Path, Rect, G, ClipPath, Defs } from "react-native-svg"

const ProfileFilled: React.FC<TIcon> = ({ classname }) => {
  return (
    <Svg
      className={customTwMerge("h-xl aspect-square", classname)}
      viewBox="0 0 24 25"
    >
      <G clip-path="url(#clip0_651_8108)">
        <Path
          d="M5.7 17.9352C5.7 17.4782 5.8471 17.1291 6.10769 16.8425C6.37942 16.5437 6.79862 16.2879 7.37369 16.0836C8.53168 15.6723 10.1656 15.5231 12.0005 15.5231C13.8443 15.5231 15.4774 15.6778 16.6319 16.0937C17.2052 16.3003 17.6228 16.5582 17.8935 16.8588C18.1534 17.1474 18.3 17.4985 18.3 17.9564C18.3 18.4132 18.153 18.7622 17.8924 19.0487C17.6208 19.3475 17.2017 19.6033 16.6267 19.8076C15.469 20.219 13.8352 20.3684 12.0005 20.3684C10.1566 20.3684 8.52326 20.214 7.36846 19.7982C6.79507 19.5917 6.37739 19.3338 6.10662 19.0332C5.84664 18.7445 5.7 18.3933 5.7 17.9352Z"
          fill="white"
          stroke="white"
          stroke-width="1.1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.0005 13.8364C14.4858 13.8364 16.5 11.8395 16.5 9.37696C16.5 6.91439 14.4858 4.91846 12.0005 4.91846C9.51523 4.91846 7.5 6.91439 7.5 9.37696C7.4916 11.8312 9.49286 13.8281 11.9688 13.8364H12.0005ZM10.1686 10.1241C10.3753 9.94105 10.6913 9.96026 10.8744 10.167C11.4574 10.8255 12.4789 10.8445 13.086 10.2081L13.1382 10.1533C13.3288 9.95352 13.6453 9.94606 13.8451 10.1367C14.0449 10.3273 14.0524 10.6438 13.8618 10.8436L13.8095 10.8983C12.7983 11.9584 11.0968 11.9268 10.1256 10.8299C9.94259 10.6231 9.9618 10.3072 10.1686 10.1241Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_651_8108">
          <Rect
            width="16"
            height="16"
            fill="white"
            transform="translate(4 4.91846)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default ProfileFilled
