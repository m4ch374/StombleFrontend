// REFERENCE: Setting - Personal

import { View } from "react-native"
import React, { useState } from "react"
import SettingsScreenLayout from "components/settings/SettingsScreenLayout"
import FlatButton from "components/styled_components/FlatButton"
import SmButton from "components/settings/SmButton"
import { useNavigation } from "@react-navigation/native"
import { useAppSlector } from "redux/hooks"
import { AntDesign } from "@expo/vector-icons"
import InputBlueBg from "components/settings/InputBlueBg"
import PopupMessage from "components/settings/PopupMessage"
import ChangeProfileModal from "components/ChangeProfileModal"
import EditableProfileIcon from "components/EditableProfileIcon"
import LatoText from "components/styled_components/LatoText"

const AccountInfoIndex: React.FC = () => {
  const { navigate } = useNavigation()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const [visible, setVisible] = useState(false)

  return (
    <SettingsScreenLayout>
      <View className="flex-1">
        <View className="flex mb-8 justify-center items-center">
          <EditableProfileIcon
            profile_link={tmpUser.link_icon}
            setModalVisible={setVisible}
          />
        </View>

        <InputBlueBg title="Full Name">
          <LatoText>{tmpUser.fullName}</LatoText>
          <SmButton
            text={"Edit"}
            onPress={() =>
              navigate("Settings", {
                screen: "EditName",
              })
            }
          />
        </InputBlueBg>

        <InputBlueBg title="Mobile Number">
          <LatoText>{tmpUser.phone}</LatoText>
          <View className="flex flex-row items-center">
            <AntDesign
              name="checkcircleo"
              size={14}
              color="#00CA23"
              style={{ marginRight: 10 }}
            />
            <SmButton
              text={"Change"}
              onPress={() => navigate("Settings", { screen: "EditPhone" })}
            />
          </View>
        </InputBlueBg>

        <InputBlueBg title="Email">
          <LatoText>{tmpUser.email || "Enter Email address"}</LatoText>
          <View className="flex flex-row items-center">
            <AntDesign
              name="checkcircleo"
              size={14}
              color={tmpUser.email ? "green" : "transparent"}
              style={{ marginRight: 10 }}
            />
            <SmButton
              text={tmpUser.email ? "Change" : "Add"}
              onPress={() => navigate("Settings", { screen: "AddEmail" })}
            />
          </View>
        </InputBlueBg>

        <InputBlueBg title="Password">
          <LatoText>{"*".repeat(tmpUser.pswLength)}</LatoText>
          <SmButton
            text={"Change"}
            onPress={() => navigate("Settings", { screen: "ChangePassword" })} // temporary navigate to ChangePassword screen, skip code verification
          />
        </InputBlueBg>
      </View>

      <View className="flex flex-col h-28 justify-between">
        <View className="flex-1 justify-start items-center ">
          {tmpUser.message && <PopupMessage />}
        </View>
        <FlatButton
          text={"Close Account"}
          onPress={() => navigate("Auth", { screen: "ReasonsOfLeave" })}
          variation="outlined"
        />
      </View>

      <ChangeProfileModal stateController={[visible, setVisible]} />
    </SettingsScreenLayout>
  )
}

export default AccountInfoIndex
