import { View, TouchableOpacity } from "react-native"
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"
import AccountFileCard from "components/AccountFileCard"
import LatoText from "components/styled_components/LatoText"

const SwipeableNotice = () => {
  const handleOnDelete = () => {}

  const renderRightActions = () => {
    return (
      <TouchableOpacity onPress={handleOnDelete}>
        <View className="h-full w-40 bg-red-500 flex-row justify-center items-center">
          <LatoText>Delete</LatoText>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable
        containerStyle={{ backgroundColor: "bg-navbar", marginBottom: 2 }}
        renderRightActions={renderRightActions}
      >
        <View className=" bg-navbar flex-row py-6 px-8 justify-center ">
          <View className="w-[42px] h-[42px] mr-8">
            <AccountFileCard uri={undefined} width={42} height={42} />
          </View>

          <View className="flex-1">
            <LatoText classname=" text-[14px] self-center ">
              Discover exciting content from new businesses that have recently
              joined Stomble. Watch their latest videos now! 2h
            </LatoText>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

export default SwipeableNotice
