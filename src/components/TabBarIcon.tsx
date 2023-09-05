// From shadow realm

import { View, Text } from "react-native"
import { RouteProp } from "@react-navigation/native"
import React from "react"
import { LoginRootTabList } from "types/Navigation"
import HomeFilled from "assets/icons/HomeFilled"
import HomeOutline from "assets/icons/HomeOutline"
import SearchFilled from "assets/icons/SearchFilled"
import SearchOutline from "assets/icons/SearchOutline"
import NotificationsFilled from "assets/icons/NotificationsFilled"
import NotificationOutline from "assets/icons/NotificationOutline"
import ProfileFilled from "assets/icons/ProfileFilled"
import ProfileOutline from "assets/icons/ProfileOutline"

type TInfoMapping = {
  [Value in keyof LoginRootTabList]: {
    label: string
    compoenent: {
      focused: JSX.Element
      unfocused: JSX.Element
    }
  }
}

const InfoMapping: TInfoMapping = {
  Home: {
    label: "Home",
    compoenent: {
      focused: <HomeFilled />,
      unfocused: <HomeOutline />,
    },
  },
  Search: {
    label: "Search",
    compoenent: {
      focused: <SearchFilled />,
      unfocused: <SearchOutline />,
    },
  },
  Notification: {
    label: "Notification",
    compoenent: {
      focused: <NotificationsFilled />,
      unfocused: <NotificationOutline />,
    },
  },
  Profile: {
    label: "Profile",
    compoenent: {
      focused: <ProfileFilled />,
      unfocused: <ProfileOutline />,
    },
  },
}

type TTabBarIcon = {
  focused: boolean
  route: RouteProp<LoginRootTabList, keyof LoginRootTabList>
}

const TabBar: React.FC<TTabBarIcon> = ({ focused, route }) => {
  return (
    <View className="h-full flex-col items-center justify-center">
      {focused
        ? InfoMapping[route.name].compoenent.focused
        : InfoMapping[route.name].compoenent.unfocused}

      <Text className={`lato-text mt-2 ${!focused && "text-gray-mid"}`}>
        {InfoMapping[route.name].label}
      </Text>
    </View>
  )
}

export default TabBar
