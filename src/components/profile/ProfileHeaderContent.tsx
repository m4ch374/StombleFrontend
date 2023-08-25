import ChangeProfileModal from "components/ChangeProfileModal"
import EditableProfileIcon from "components/EditableProfileIcon"
import React, { useState } from "react"
import { View, Text } from "react-native"

type TProfileHeaderContent = {
  userName: string
  profile_link: string
}

const ProfileHeaderContent: React.FC<TProfileHeaderContent> = ({
  userName,
  profile_link,
}) => {
  const [editVisible, setEditVisible] = useState(false)

  return (
    <>
      <View className="flex gap-2 px-4 py-4">
        <EditableProfileIcon
          profile_link={profile_link}
          setModalVisible={setEditVisible}
        />
        <Text className="text-white font-Lato">{userName}</Text>
      </View>

      <ChangeProfileModal stateController={[editVisible, setEditVisible]} />
    </>
  )
}

export default ProfileHeaderContent
