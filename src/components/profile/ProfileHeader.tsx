import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

type TProfileHeader = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  userName: string
}

const ProfileHeader: React.FC<TProfileHeader> = ({
  setModalVisible,
  userName,
}) => {
  const navigation = useNavigation()

  return (
    <View className="h-[26px] flex-row justify-between items-center px-4">
      <TouchableOpacity
        className="flex-row items-center gap-1"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white font-LatoBold text-xl">{userName}</Text>
        <Entypo name="chevron-down" size={20} color="white" />
      </TouchableOpacity>

      <View className="flex-row gap-4">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LoginRoot", { screen: "Notification" })
          }}
        >
          <MaterialCommunityIcons name="bell" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileHeader
