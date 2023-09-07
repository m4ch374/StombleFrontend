// REFERENCE: Setting - Personal

import { View } from "react-native"
import React, { useState } from "react"
import SettingsScreenLayout from "components/settings/SettingsScreenLayout"
import SmButton from "components/settings/SmButton"
import { useNavigation } from "@react-navigation/native"
import { useAppSlector } from "redux/hooks"
import InputBlueBg from "components/settings/InputBlueBg"
import PopupMessage from "components/settings/PopupMessage"
import ChangeProfileModal from "components/ChangeProfileModal"
import EditableProfileIcon from "components/EditableProfileIcon"
import OutlinedButton from "components/settings/OutlinedButton"
import { Type } from "types/variantStyle"

const AccountInfoIndex: React.FC = () => {
  const { navigate } = useNavigation()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const [visible, setVisible] = useState(false)

  return (
    <SettingsScreenLayout>
      <View className="flex-1">
        <View className="flex mb-16 justify-center items-center">
          <EditableProfileIcon
            profile_link={tmpUser.link_icon}
            setModalVisible={setVisible}
          />
        </View>

        <InputBlueBg
          title="Full Name"
          userInfo={tmpUser.fullName}
          variant={Type.filled}
        >
          <SmButton
            text={"Change"}
            onPress={() =>
              navigate("Settings", {
                screen: "EditName",
              })
            }
          />
        </InputBlueBg>

        <InputBlueBg
          title="Mobile Number"
          userInfo={tmpUser.phone}
          variant={Type.filled}
        >
          <SmButton
            text={"Change"}
            onPress={() => navigate("Settings", { screen: "EditPhone" })}
          />
        </InputBlueBg>

        <InputBlueBg
          title="Email"
          userInfo={tmpUser.email || "Not added yet!"}
          variant={Type.filled}
        >
          <SmButton
            text={tmpUser.email ? "Change" : "Add"}
            onPress={() => navigate("Settings", { screen: "AddEmail" })}
            variation={tmpUser.email ? Type.outlined : Type.filled}
          />
        </InputBlueBg>

        <InputBlueBg
          title="Password"
          userInfo={"*".repeat(tmpUser.pswLength)}
          variant={Type.filled}
        >
          <SmButton
            text={"Change"}
            // TODO: VerifyCode for changePassword endpoint is not ready, temporarily skip this step and navigate to ChangePassword screen
            onPress={() => navigate("Settings", { screen: "ChangePassword" })}
          />
        </InputBlueBg>
      </View>

      <View className="flex flex-col h-[110px] justify-between">
        <View className="flex-1 justify-start items-center ">
          {tmpUser.message && <PopupMessage />}
        </View>
        <OutlinedButton
          text={"Close Account"}
          onPress={() => navigate("Settings", { screen: "ReasonsOfLeave" })}
          colorTheme="red"
        />
      </View>

      <ChangeProfileModal stateController={[visible, setVisible]} />
    </SettingsScreenLayout>
  )
}

export default AccountInfoIndex
