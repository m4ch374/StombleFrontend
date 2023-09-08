// Thanks again Yume! - Henry

import React, { Dispatch, SetStateAction } from "react"
import { TouchableOpacity, View } from "react-native"
import AccountFileCard from "./AccountFileCard"
import ProfileIcon from "assets/icons/ProfileIcon"

type TEditableProfileicon = {
  profile_link: string
  setModalVisible: Dispatch<SetStateAction<boolean>>
}

const EditableProfileIcon: React.FC<TEditableProfileicon> = ({
  profile_link,
  setModalVisible,
}) => {
  return (
    <View className="w-[64px] h-[64px] relative">
      <AccountFileCard
        uri={profile_link}
        height={64}
        width={64}
        borderRadius={50}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute bottom-0 left-21 "
      >
        <ProfileIcon classname="w-[24px] h-[24px]" />
      </TouchableOpacity>
    </View>
  )
}

export default EditableProfileIcon
