import React from "react"
import { View, TouchableOpacity } from "react-native"
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import LatoText from "components/styled_components/LatoText"
import CustomColor from "constants/Colors"

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
    <View className="h-[26px] flex-row justify-between items-center px-sm">
      <TouchableOpacity
        className="flex-row items-center gap-1"
        onPress={() => setModalVisible(true)}
      >
        <LatoText classname="font-lato-bold text-xl">{userName}</LatoText>
        <Entypo name="chevron-down" size={20} color={CustomColor.white} />
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
            color={CustomColor.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileHeader
