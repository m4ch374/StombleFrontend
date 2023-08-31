// Code from shadow realm

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { LoginRootTabList } from "types/Navigation"
import TabBarIcon from "components/TabBarIcon"
import Home from "screens/login_root/Home"
import Profile from "screens/login_root/Profile"
import { Platform, SafeAreaView, StatusBar } from "react-native"
import Notifications from "screens/login_root/Notifications"
import CustomColor from "constants/Colors"

const BottomTab = createBottomTabNavigator<LoginRootTabList>()

// The code quality was really bad before cleaning up.....
// And git lens blames me for that lol why
const LoginRootTab = () => {
  return (
    <SafeAreaView
      className="h-full bg-background"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: CustomColor.navbar,
            height: 60,
            borderTopColor: "transparent",
            paddingBottom: 0,
            padding: 0,
            margin: 0,
          },
          tabBarIcon: props => TabBarIcon({ ...props, route }),
          tabBarHideOnKeyboard: true,
        })}
      >
        <BottomTab.Screen name="Home" component={Home} />

        <BottomTab.Screen name="Search" component={Home} />

        <BottomTab.Screen name="Notification" component={Notifications} />

        <BottomTab.Screen name="Profile" component={Profile} />
      </BottomTab.Navigator>
    </SafeAreaView>
  )
}

export default LoginRootTab
