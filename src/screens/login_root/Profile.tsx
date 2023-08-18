// REFERENCE: For Users - Business Profile
// idk what that meant lol

import { Text, StatusBar, View, TouchableOpacity } from "react-native"
import BackgroundColour from "components/styled_components/BackgroundColour"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import SwipableModal from "components/styled_components/SwipableModal"
import ModalSettingsBtn from "components/profile/ModalSettingsBtn"

const Profile = () => {
  const navigation = useNavigation()

  const [visible, setVisible] = useState(false)

  // We'll keep the workaround this way, probably embed this in <BackgroundColour /> in the future
  return (
    <BackgroundColour>
      <View
        className={`
          flex
          justify-center
          items-center
          h-full
          gap-5
          pt-[${StatusBar.currentHeight ? StatusBar.currentHeight + 1 : 0}px]
      `}
      >
        <TouchableOpacity
          className="bg-blue-500 p-2 rounded-md"
          onPress={() => setVisible(true)}
        >
          <Text className="text-white">Popup</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-blue-500 p-2 rounded-md"
          onPress={() =>
            navigation.navigate("Settings", { screen: "SettingsIndex" })
          }
        >
          <Text className="text-white">Click me for settings</Text>
        </TouchableOpacity>

        <SwipableModal stateController={[visible, setVisible]}>
          <ModalSettingsBtn
            onPress={() => {
              setVisible(false)
              navigation.navigate("Settings", { screen: "SettingsIndex" })
            }}
          >
            Settings
          </ModalSettingsBtn>

          <ModalSettingsBtn>QR Code</ModalSettingsBtn>

          <ModalSettingsBtn>Copy profile link</ModalSettingsBtn>
        </SwipableModal>
      </View>
    </BackgroundColour>
  )
}

export default Profile
