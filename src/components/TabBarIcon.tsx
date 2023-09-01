// From shadow realm

import { View, Text } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { MaterialCommunityIcons, Ionicons, Entypo } from "@expo/vector-icons"
import React from "react"
import { LoginRootTabList } from "types/Navigation"
import CustomColor from "constants/Colors"

type TInfoMapping = {
  [Value in keyof LoginRootTabList]: {
    label: string
    compoenent: React.FC<{ color: string }>
  }
}

const InfoMapping: TInfoMapping = {
  Home: {
    label: "Home",
    compoenent: ({ color }) => <Entypo name="home" size={20} color={color} />,
  },
  Search: {
    label: "Search",
    compoenent: ({ color }) => (
      <MaterialCommunityIcons name="magnify" size={20} color={color} />
    ),
  },
  Notification: {
    label: "Notification",
    compoenent: ({ color }) => (
      <MaterialCommunityIcons name="bell-outline" size={20} color={color} />
    ),
  },
  Profile: {
    label: "Profile",
    compoenent: ({ color }) => (
      <Ionicons name="person-outline" size={20} color={color} />
    ),
  },
}

type TTabBarIcon = {
  focused: boolean
  route: RouteProp<LoginRootTabList, keyof LoginRootTabList>
}

const TabBar: React.FC<TTabBarIcon> = ({ focused, route }) => {
  return (
    <View className="h-full flex-col items-center justify-center">
      {InfoMapping[route.name].compoenent({
        color: focused ? CustomColor.white : CustomColor.gray.mid,
      })}

      <Text className={`lato-text mt-2 ${!focused && "text-gray-mid"}`}>
        {InfoMapping[route.name].label}
      </Text>
    </View>
  )
}

export default TabBar