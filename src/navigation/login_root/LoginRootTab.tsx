// Code from shadow realm

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { LoginRootTabList } from "types/Navigation"
import TabBarIcon from "components/TabBarIcon"
import Home from "screens/login_root/Home"
import Profile from "screens/login_root/Profile"
import Notifications from "screens/login_root/Notifications"
import CustomColor from "constants/Colors"
import Search from "screens/login_root/Search"
import { useEffect, useRef, useState } from "react"
import { getUserAccountInformation } from "utils/services/accountInfo"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { tokenAction } from "redux/reducers/tokens.reducer"
import { refreshToken } from "utils/services/auth"
import * as ExpoNotifications from "expo-notifications"
import { registerForPushNotificationsAsync } from "utils/NotificationSuscription"
import { setNotificationToken } from "utils/services/profile"

const BottomTab = createBottomTabNavigator<LoginRootTabList>()

const LoginRootTab = () => {
  const dispatch = useAppDispatch()
  const refToken = useAppSlector(state => state.tokens.refreshToken)
  const [expoToken, setExpoPushToken] = useState<string | null>()
  const [, setNotification] = useState<ExpoNotifications.Notification | null>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const notificationListener: any = useRef()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const responseListener: any = useRef()

  useEffect(() => {
    ;(async () => {
      // endpoint: get user info and store into tmpStore
      let userResp = await getUserAccountInformation()

      if (typeof userResp === "undefined") {
        const refreshResp = await refreshToken({ refreshToken: refToken })
        if (typeof refreshResp === "undefined") return
        dispatch(tokenAction.setToken(refreshResp.AccessToken))

        userResp = await getUserAccountInformation()
      }

      dispatch(
        tmpStoreAction.setState(state => {
          const { result } = userResp
          state.userId = result.id
          state.fullName = result.fullName
          state.phone = result.phone
          state.email = result.email
          state.link_icon = result.link_icon
          return state
        }),
      )
    })()
  }, [dispatch])

  useEffect(() => {
    void registerForPushNotificationsAsync().then(token =>
      setExpoPushToken(token?.data),
    )

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    notificationListener.current =
      ExpoNotifications.addNotificationReceivedListener(notification => {
        return setNotification(notification)
      })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    responseListener.current =
      ExpoNotifications.addNotificationResponseReceivedListener(response => {
        console.log(response)
      })

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
      ExpoNotifications.removeNotificationSubscription(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        notificationListener.current,
      )
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      ExpoNotifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      if (expoToken) {
        await setNotificationToken({
          notificationToken: expoToken,
        })
      }
    })()
  }, [expoToken])

  return (
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
  )
}

export default LoginRootTab
