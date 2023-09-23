import React, { useMemo } from "react"
import { View, TouchableOpacity, Platform, StatusBar } from "react-native"
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
  const headerHeight = useMemo(() => {
    return (
      34 +
      Math.round(
        Platform.OS === "android" ? (StatusBar.currentHeight as number) : 0,
      )
    )
  }, [])

  return (
    <View
      className="flex justify-end items-center px-md py-sm z-50 bg-background"
      style={{ height: headerHeight }}
    >
      <View className="flex-row justify-between items-center w-full">
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
    </View>
  )
}

export default ProfileHeader
