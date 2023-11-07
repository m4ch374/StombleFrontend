import { View, TouchableOpacity, Pressable, Text } from "react-native"
import { Swipeable } from "react-native-gesture-handler"
import AccountFileCard from "components/AccountFileCard"
import LatoText from "components/styled_components/LatoText"
import { NotificationsItem } from "types/endpoints"
import { useCallback } from "react"
import {
  deleteOneNotification,
  readOneNotification,
} from "utils/services/notifications"
import { Helper } from "utils/helpers"
import { useDispatch } from "react-redux"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { useAppSlector } from "redux/hooks"

const SwipeableNotice = ({
  notification,
  setNotifications,
}: {
  notification: NotificationsItem
  setNotifications: React.Dispatch<React.SetStateAction<NotificationsItem[]>>
}) => {
  const dispatch = useDispatch()
  const tmpUser = useAppSlector(state => state.tmpStore)

  const handleOnRead = useCallback(() => {
    const payload = {
      notificationId: notification.id,
      isRead: notification.isRead,
    }
    ;(async () => {
      const resp = await readOneNotification(payload)

      if (typeof resp === "undefined") return

      notification.isRead = !notification.isRead

      dispatch(
        tmpStoreAction.setState({
          ...tmpUser,
          message: resp.msg,
        }),
      )
    })()
  }, [notification.id])

  const handleOnDelete = useCallback(() => {
    ;(async () => {
      const resp = await deleteOneNotification({
        notificationId: notification.id,
      })
      if (typeof resp === "undefined") return

      setNotifications(prevNotifications =>
        prevNotifications.filter(item => item.id !== notification.id),
      )

      dispatch(
        tmpStoreAction.setState({
          ...tmpUser,
          message: resp.msg,
        }),
      )
    })()
  }, [notification.id])

  // TODO: goes to view content
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
        containerStyle={{ backgroundColor: "bg-navbar" }}
        renderRightActions={renderRightActions}
        dragOffsetFromRightEdge={100}
      >
        <Pressable onPress={handleOnRead}>
          <View
            className={` ${
              notification.isRead ? "bg-background" : "bg-navbar "
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
              <View className="">
                <Text className="font-lato text-white text-[14px]">
                  {notification.msg}
                  {"  "}
                  <LatoText classname="text-[14px] text-gray-mid">
                    {Helper.formatToHoursOrDays(notification.created_at)}
                  </LatoText>
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Swipeable>
    </>
  )
}

export default SwipeableNotice
