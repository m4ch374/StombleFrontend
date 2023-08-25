import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons"
import { RouteProp } from "@react-navigation/native"
import React from "react"
import { View, Text } from "react-native"
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
    icon: ({ color }) => (
      <MaterialIcons name="storefront" size={24} color={color} />
    ),
  },
  VideosLiked: {
    label: "Liked videos",
    icon: ({ color }) => <AntDesign name="hearto" size={24} color={color} />,
  },
  VideosSaved: {
    label: "Saved videos",
    icon: ({ color }) => <Feather name="bookmark" size={24} color={color} />,
  },
}
// ======================================================

type TProfileTabIcon = {
  focused: boolean
  route: RouteProp<ProfileTabList, keyof ProfileTabList>
}

const ProfileTabIcon: React.FC<TProfileTabIcon> = ({ focused, route }) => {
  return (
    <View className="w-full flex-row items-center justify-center gap-2">
      {TabIconMapping[route.name].icon({ color: focused ? "white" : "grey" })}
      <Text
        className={`
          ${focused ? "text-white" : "text-gray-500"}
          font-LatoBold
        `}
      >
        {TabIconMapping[route.name].label}
      </Text>
    </View>
  )
}

export default ProfileTabIcon
