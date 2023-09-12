// REFERENCE: Personal profile

import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import SwipableModal from "components/styled_components/SwipableModal"
import ModalSettingsBtn from "components/profile/ModalSettingsBtn"
import ProfileHeader from "components/profile/ProfileHeader"
import ProfileTab from "navigation/login_root/ProfileTab"
import { View } from "react-native"
import { useAppSlector } from "redux/hooks"
import FieldSeperator from "components/FieldSeperator"

const Profile: React.FC = () => {
  const navigation = useNavigation()
  const tmpState = useAppSlector(state => state.tmpStore)

  const [visible, setVisible] = useState(false)

  return (
    <View className="bg-background h-full">
      <ProfileHeader
        setModalVisible={setVisible}
        userName={tmpState.fullName}
      />

      <ProfileTab />

      <SwipableModal stateController={[visible, setVisible]}>
        <ModalSettingsBtn
          onPress={() => {
            setVisible(false)
            navigation.navigate("Settings", { screen: "SettingsIndex" })
          }}
        >
          Settings
        </ModalSettingsBtn>

        <FieldSeperator />

        <ModalSettingsBtn>QR Code</ModalSettingsBtn>
      </SwipableModal>
    </View>
  )
}

export default Profile
