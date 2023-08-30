// Thanks again Yume! - Henry

import React, { Dispatch, SetStateAction } from "react"
import { TouchableOpacity, View } from "react-native"
import AccountFileCard from "./AccountFileCard"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import CustomColor from "constants/Colors"

type TEditableProfileicon = {
  profile_link: string
  setModalVisible: Dispatch<SetStateAction<boolean>>
}

const EditableProfileIcon: React.FC<TEditableProfileicon> = ({
  profile_link,
  setModalVisible,
}) => {
  return (
    <View className="w-[60px] h-[60px] relative">
      <AccountFileCard
        uri={profile_link}
        height={60}
        width={60}
        borderRadius={50}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="w-[18px] h-[18px] absolute bottom-0 right-0 bg-white rounded-lg flex items-center justify-center border-[1px] border-background "
      >
        <MaterialCommunityIcons
          name="square-edit-outline"
          size={12}
          color={CustomColor.background}
        />
      </TouchableOpacity>
    </View>
  )
}

export default EditableProfileIcon
