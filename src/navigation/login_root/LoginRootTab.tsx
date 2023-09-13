// Code from shadow realm

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { LoginRootTabList } from "types/Navigation"
import TabBarIcon from "components/TabBarIcon"
import Home from "screens/login_root/Home"
import Profile from "screens/login_root/Profile"
import { Platform, SafeAreaView, StatusBar } from "react-native"
import Notifications from "screens/login_root/Notifications"
import CustomColor from "constants/Colors"
import Search from "screens/login_root/Search"
import { useEffect } from "react"
import { getUserAccountInformation } from "utils/services/accountInfo"
import { useAppDispatch } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"

const BottomTab = createBottomTabNavigator<LoginRootTabList>()

const LoginRootTab = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    ;(async () => {
      // endpoint: get user info and store into tmpStore
      const userResp = await getUserAccountInformation()

      if (typeof userResp === "undefined") return

      dispatch(
        tmpStoreAction.setState(state => {
          const { result } = userResp
          const HOST_URL =
            "https://stomble-users.s3.ap-southeast-2.amazonaws.com/"

          state.userId = result.id
          state.fullName = result.fullName
          state.phone = result.phone
          state.email = result.email
          state.link_icon = HOST_URL + result.link_icon
          return state
        }),
      )
    })()
  }, [dispatch])

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
          },
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} route={route} />
          ),
          tabBarHideOnKeyboard: true,
        })}
      >
        <BottomTab.Screen name="Home" component={Home} />

        <BottomTab.Screen name="Search" component={Search} />

        <BottomTab.Screen name="Notification" component={Notifications} />

        <BottomTab.Screen name="Profile" component={Profile} />
      </BottomTab.Navigator>
    </SafeAreaView>
  )
}

export default LoginRootTab
