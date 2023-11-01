import { View, TouchableOpacity } from "react-native"
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"
import AccountFileCard from "components/AccountFileCard"
import LatoText from "components/styled_components/LatoText"
import { NotificationsItem } from "types/endpoints"

const SwipeableNotice = ({
  notification,
}: {
  notification: NotificationsItem
}) => {
  const handleOnRead = () => {}
  const handleOnDelete = () => {}

  const renderRightActions = () => {
    return (
      <>
        <TouchableOpacity onPress={handleOnDelete}>
          <View className="h-full w-30 bg-red-500 flex-row justify-center items-center">
            <LatoText>Delete</LatoText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOnRead}>
          <View className="h-full w-30 bg-secondary flex-row justify-center items-center">
            <LatoText>Read</LatoText>
          </View>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable
        containerStyle={{ backgroundColor: "bg-navbar", marginBottom: 2 }}
        renderRightActions={renderRightActions}
        dragOffsetFromRightEdge={100}
      >
        <View
          className={` ${
            notification.isRead ? "bg-background" : "bg-navbar "
          } flex-row py-6 px-8 justify-center `}
        >
          <View className="w-[42px] h-[42px] mr-8">
            {/* TODO: endpoint missing Link_icon, leave empty for now */}
            <AccountFileCard uri={undefined} width={42} height={42} />
          </View>

          <View className="flex-1">
            <LatoText classname=" text-[14px] self-center ">
              {notification.title}
            </LatoText>
            <LatoText classname=" text-[14px] self-center ">
              {notification.msg}
            </LatoText>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

export default SwipeableNotice
