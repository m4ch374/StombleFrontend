import React from "react"
import { View, TouchableOpacity } from "react-native"
import LatoText from "components/styled_components/LatoText"
import ThreeDotsVertical from "assets/icons/ThreeDotsVertical"
import CheveronDown from "assets/icons/CheveronDown"

type TProfileHeader = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  userName: string
}

const ProfileHeader: React.FC<TProfileHeader> = ({
  setModalVisible,
  userName,
}) => {
  return (
    <View className="h-[34px] flex-row justify-between items-center px-md z-50 bg-background">
      <TouchableOpacity
        className="flex-row items-center gap-1"
        onPress={() => setModalVisible(true)}
      >
        <LatoText classname="font-lato-bold text-xl">{userName}</LatoText>
        <CheveronDown classname="h-lg" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <ThreeDotsVertical classname="h-13" />
      </TouchableOpacity>
    </View>
  )
}

export default ProfileHeader
