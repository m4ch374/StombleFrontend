import { View, TouchableOpacity, Pressable } from "react-native"
import { Swipeable } from "react-native-gesture-handler"
import AccountFileCard from "components/AccountFileCard"
import LatoText from "components/styled_components/LatoText"
import { NotificationsItem } from "types/endpoints"
import { useEffect, useState } from "react"
import {
  deleteOneNotification,
  readOneNotification,
} from "utils/services/notifications"
import { Helper } from "utils/helpers"

const SwipeableNotice = ({
  notification,
  onRefresh,
}: {
  notification: NotificationsItem
  onRefresh: () => void
}) => {
  const [isNotificationRead, setIsNoticationRead] = useState(
    notification.isRead,
  )

  useEffect(() => {
    onRefresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNotificationRead])

  const handleOnRead = () => {
    const payload = {
      notificationId: notification.id,
      isRead: notification.isRead,
    }
    ;(async () => {
      const resp = await readOneNotification(payload)
      if (typeof resp === "undefined") return
      setIsNoticationRead(true)
    })()
  }

  const handleOnDelete = () => {
    ;(async () => {
      const resp = await deleteOneNotification({
        notificationId: notification.id,
      })
      if (typeof resp === "undefined") return

      // refresh of the notifications list
      onRefresh()
    })()
  }

  const handleOnView = () => {}

  const renderRightActions = () => {
    return (
      <>
        <TouchableOpacity onPress={handleOnDelete}>
          <View className="h-full w-30 bg-red-500 flex-row justify-center items-center">
            <LatoText>Delete</LatoText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOnView}>
          <View className="h-full w-30 bg-secondary flex-row justify-center items-center">
            <LatoText>View</LatoText>
          </View>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <>
      <Swipeable
        containerStyle={{ backgroundColor: "bg-navbar", marginBottom: 2 }}
        renderRightActions={renderRightActions}
        dragOffsetFromRightEdge={100}
      >
        <Pressable onPress={handleOnRead}>
          <View
            className={` ${
              isNotificationRead ? "bg-background" : "bg-navbar "
            } flex-row py-6 px-8 `}
          >
            <View className="w-[42px] h-[42px] mr-8">
              {/* TODO: endpoint missing Link_icon, leave empty for now */}
              <AccountFileCard uri={undefined} width={42} height={42} />
            </View>

            <View className="flex-1 self-center ">
              <LatoText classname=" text-[14px] font-lato-bold ">
                {notification.title}
              </LatoText>
              <View className="flex-row">
                <LatoText classname=" text-[14px]">{notification.msg}</LatoText>
                <LatoText classname="text-[14px] ml-2 text-gray-mid">
                  {Helper.formatToHoursOrDays(notification.created_at)}
                </LatoText>
              </View>
            </View>
          </View>
        </Pressable>
      </Swipeable>
    </>
  )
}

export default SwipeableNotice
