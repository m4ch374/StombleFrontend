// REFERENCE: For Users - Business Account (Notifications)

import { useNavigation } from "@react-navigation/native"
import SettingIcon from "assets/icons/Setting"
import SwipeableNotice from "components/notification/SwipeableNotice"
import PopupMessage from "components/settings/PopupMessage"
import LatoText from "components/styled_components/LatoText"
import RootTabLayout from "components/styled_components/RootTabLayout"
import React, { useEffect, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  View,
} from "react-native"
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler"
import { useDispatch } from "react-redux"
import { useAppSlector } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { NotificationsItem } from "types/endpoints"
import {
  getNotifications,
  readAllNotifications,
} from "utils/services/notifications"

const Notifications: React.FC = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const [refreshing, setRefreshing] = useState(true)
  const [notifications, setNotifications] = useState<NotificationsItem[]>([])

  const loadNotificationData = () => {
    setRefreshing(true)
    ;(async () => {
      const payload = { take: "10", skip: "0" }
      const resp = await getNotifications(payload)

      if (typeof resp === "undefined") return

      setRefreshing(false)
      setNotifications(resp.result)
    })()
  }

  useEffect(() => {
    loadNotificationData()
  }, [])

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

      dispatch(
        tmpStoreAction.setState({
          ...tmpUser,
          message: resp.msg,
        }),
      )
    })()
  }

  const handleReadMore = () => {
    ;(async () => {
      const payload = { take: (notifications.length + 5).toString(), skip: "0" }
      const resp = await getNotifications(payload)

      if (typeof resp === "undefined") return

      setNotifications(resp.result)
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

          <View className={"w-full flex-1 "}>
            {refreshing ? <ActivityIndicator /> : null}
            {notifications.length > 0 ? (
              <>
                <FlatList
                  data={notifications}
                  keyExtractor={notification => notification.id}
                  renderItem={({ item }) => (
                    <SwipeableNotice
                      notification={item}
                      setNotifications={setNotifications}
                    />
                  )}
                  ItemSeparatorComponent={() => (
                    <View className="h-[1px] w-full bg-gray-darkest/40" />
                  )}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={loadNotificationData}
                    />
                  }
                  onEndReached={handleReadMore}
                  onEndReachedThreshold={0.1}
                />
              </>
            ) : (
              <View className="flex-row justify-center items-center h-full">
                <LatoText classname="text-lg">
                  No notifications yet ...
                </LatoText>
              </View>
            )}
          </View>

          <View className="w-full flex justify-center items-center absolute bottom-16 ">
            {tmpUser.message && <PopupMessage />}
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </RootTabLayout>
  )
}

export default Notifications
