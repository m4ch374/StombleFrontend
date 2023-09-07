// Thanks again Yume! - Henry

import React, { Dispatch, SetStateAction } from "react"
import { TouchableOpacity, View } from "react-native"
import AccountFileCard from "./AccountFileCard"
import { MaterialCommunityIcons } from "@expo/vector-icons"

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
        className="w-9 h-9 absolute bottom-0 right-0 bg-white rounded-full border border-background flex items-center justify-center "
      >
        <MaterialCommunityIcons name="square-edit-outline" size={14} />
      </TouchableOpacity>
    </View>
  )
}

export default EditableProfileIcon
