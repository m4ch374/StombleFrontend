import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { ProfileTabList } from "types/Navigation"
import Following from "components/profile/Following"
import VideosLiked from "components/profile/VideosLiked"
import VideosSaved from "components/profile/VideosSaved"
import ProfileTabIcon from "components/profile/ProfileTabIcon"
import { View } from "react-native"
import CustomColor from "constants/Colors"

const TopTab = createMaterialTopTabNavigator<ProfileTabList>()

const ProfileTab: React.FC = () => {
  return (
    <TopTab.Navigator
      initialRouteName="Following"
      screenOptions={({ route }) => ({
        lazy: true,
        lazyPlaceholder: () => <View className="h-full bg-bgProfile" />,
        tabBarStyle: { backgroundColor: CustomColor.background },
        tabBarAndroidRipple: { radius: 0 },
        tabBarPressColor: "transparent",
        tabBarPressOpacity: 0,
        tabBarShowLabel: false,
        tabBarIconStyle: { width: "auto" },
        tabBarIcon: props => ProfileTabIcon({ ...props, route }),
        tabBarIndicatorStyle: {
          backgroundColor: "white",
          borderRadius: 99, // I dont see any difference lol
        },
        tabBarIndicatorContainerStyle: {
          borderBottomWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.1)",
        },
      })}
    >
      <TopTab.Screen name="Following" component={Following} />
      <TopTab.Screen name="VideosLiked" component={VideosLiked} />
      <TopTab.Screen name="VideosSaved" component={VideosSaved} />
    </TopTab.Navigator>
  )
}

export default ProfileTab
