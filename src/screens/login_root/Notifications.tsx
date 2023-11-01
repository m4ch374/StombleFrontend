// REFERENCE: For Users - Business Account (Notifications)

import SettingIcon from "assets/icons/Setting"
import SwipeableNotice from "components/notification/SwipeableNotice"
import LatoText from "components/styled_components/LatoText"
import RootTabLayout from "components/styled_components/RootTabLayout"
import React, { useEffect, useState } from "react"
import { SafeAreaView, ScrollView, View } from "react-native"
import { NotificationsItem } from "types/endpoints"
import { getNotifications } from "utils/services/notifications"

const Notifications: React.FC = () => {
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

  return (
    <RootTabLayout>
      <SafeAreaView className="bg-background h-full">
        <View className="flex-row justify-between py-6 px-8">
          <LatoText classname={`font-[18px] font-lato-bold`}>
            Notifications
          </LatoText>
          <View className="flex-row">
            <LatoText
              classname={`text-secondary mr-4 text-[14px] text-center font-lato-bold self-center `}
            >
              Mark all as read
            </LatoText>
            <SettingIcon />
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
              <LatoText classname="text-lg">No notifications yet ...</LatoText>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </RootTabLayout>
  )
}

export default Notifications
