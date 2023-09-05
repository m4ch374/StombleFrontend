import { RouteProp } from "@react-navigation/native"
import BookmarkSmall from "assets/icons/BookmarkSmall"
import LikedVideo from "assets/icons/LikedVideo"
import Store from "assets/icons/Store"
import LatoText from "components/styled_components/LatoText"
import CustomColor from "constants/Colors"
import React from "react"
import { View } from "react-native"
import { ProfileTabList } from "types/Navigation"

// ======================================================
// Mapping
// ======================================================
type TTabIconMapping = {
  [Value in keyof ProfileTabList]: {
    label: string
    icon: React.FC<{ color: string }>
  }
}

const TabIconMapping: TTabIconMapping = {
  Following: {
    label: "Following",
    icon: ({ color }) => <Store classname="h-12" color={color} />,
  },
  VideosLiked: {
    label: "Liked videos",
    icon: ({ color }) => <LikedVideo classname="h-12" color={color} />,
  },
  VideosSaved: {
    label: "Saved videos",
    icon: ({ color }) => <BookmarkSmall classname="h-12" color={color} />,
  },
}
// ======================================================

type TProfileTabIcon = {
  focused: boolean
  route: RouteProp<ProfileTabList, keyof ProfileTabList>
}

const ProfileTabIcon: React.FC<TProfileTabIcon> = ({ focused, route }) => {
  return (
    <View className="w-full flex-row items-center justify-center gap-sm">
      <View>
        {TabIconMapping[route.name].icon({
          color: focused ? CustomColor.white : CustomColor.gray.mid,
        })}
      </View>
      <View>
        <LatoText classname={`${focused ? "text-white" : "text-gray-mid"}`}>
          {TabIconMapping[route.name].label}
        </LatoText>
      </View>
    </View>
  )
}

export default ProfileTabIcon
