// REFERENCE: For Users - Business Account (Notifications)

import { useNavigation } from "@react-navigation/native"
import SettingIcon from "assets/icons/Setting"
import SwipeableNotice from "components/notification/SwipeableNotice"
import LatoText from "components/styled_components/LatoText"
import RootTabLayout from "components/styled_components/RootTabLayout"
import React, { useEffect, useState } from "react"
import { Pressable, SafeAreaView, ScrollView, View } from "react-native"
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler"
import { NotificationsItem } from "types/endpoints"
import {
  getNotifications,
  readAllNotifications,
} from "utils/services/notifications"

const Notifications: React.FC = () => {
  const { navigate } = useNavigation()
  const [refreshNotifications, setRefreshNotifications] = useState(false)
  const [notifications, setNotifications] = useState<NotificationsItem[]>([])

  useEffect(() => {
    ;(async () => {
      const resp = await getNotifications({ take: "10", skip: "0" })

      if (typeof resp === "undefined") return

      console.log("notifications", resp.result)
      setNotifications(resp.result)
    })()

    setRefreshNotifications(false)
  }, [refreshNotifications])

  const handleReadAll = () => {
    ;(async () => {
      const resp = await readAllNotifications()

      if (typeof resp === "undefined") return

      setNotifications(
        notifications.map(notification => {
          notification.isRead = true
          return notification
        }),
      )
    })()
  }

  return (
    <RootTabLayout>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView className="bg-background h-full">
          <View className="flex-row justify-between py-6 px-8">
            <LatoText classname={`font-[18px] font-lato-bold self-center`}>
              Notifications
            </LatoText>

            <View className="flex-row">
              <TouchableOpacity
                onPress={handleReadAll}
                className="flex-1 justify-center"
              >
                <LatoText
                  classname={`text-secondary mr-4 text-[14px] text-center font-lato-bold`}
                >
                  Mark all as read
                </LatoText>
              </TouchableOpacity>

              <Pressable
                onPress={() =>
                  navigate("Settings", { screen: "SettingsIndex" })
                }
              >
                <SettingIcon />
              </Pressable>
            </View>
          </View>
          <ScrollView className={"w-full"}>
            {notifications.length > 0 ? (
              notifications.map(notification => {
                return (
                  <SwipeableNotice
                    key={notification.id}
                    notification={notification}
                    onRefresh={() => setRefreshNotifications(true)}
                  />
                )
              })
            ) : (
              <View className="flex-row justify-center items-center h-full">
                <LatoText classname="text-lg">
                  No notifications yet ...
                </LatoText>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </GestureHandlerRootView>
    </RootTabLayout>
  )
}

export default Notifications
