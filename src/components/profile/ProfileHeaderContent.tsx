import ChangeProfileModal from "components/ChangeProfileModal"
import EditableProfileIcon from "components/EditableProfileIcon"
import LatoText from "components/styled_components/LatoText"
import { useState } from "react"
import { View } from "react-native"
import { useAppSlector } from "redux/hooks"

const ProfileHeaderContent = () => {
  const [editVisible, setEditVisible] = useState(false)

  const tmpUser = useAppSlector(state => state.tmpStore)

  return (
    <>
      <View className="flex gap-2 px-4 my-4">
        <EditableProfileIcon
          profile_link={tmpUser.link_icon}
          setModalVisible={setEditVisible}
        />
        <LatoText>{tmpUser.fullName}</LatoText>
      </View>

      <ChangeProfileModal stateController={[editVisible, setEditVisible]} />
    </>
  )
}

export default ProfileHeaderContent
