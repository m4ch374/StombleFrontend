// Code from shadow realm

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useTheme } from "native-base"
import { LoginRootTabList } from "types/Navigation"
import TabBarIcon from "components/TabBarIcon"
import Home from "screens/login_root/Home"
import Profile from "screens/login_root/Profile"
import { Platform, SafeAreaView, StatusBar } from "react-native"
import Notifications from "screens/login_root/Notifications"

const BottomTab = createBottomTabNavigator<LoginRootTabList>()

// The code quality was really bad before cleaning up.....
// And git lens blames me for that lol why
const LoginRootTab = () => {
  const { color } = useTheme().colors // Ok somehow we have dups

  return (
    <SafeAreaView
      className="h-full bg-bgProfile"
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
            backgroundColor: color.tabBarBgColor,
            height: 60,
            borderTopColor: "transparent",
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
