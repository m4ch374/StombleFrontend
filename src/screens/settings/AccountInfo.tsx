// REFERENCE: Setting - Personal

import { View, Text } from "react-native"
import React from "react"
import SettingsScreenLayout from "components/styled_components/SettingsScreenLayout"
import FlatButton from "components/styled_components/FlatButton"
import SmButton from "components/styled_components/SmButton"
import { useNavigation } from "@react-navigation/native"
import { useAppSlector } from "redux/hooks"
import { AntDesign } from "@expo/vector-icons"
import InputBlueBg from "components/InputBlueBg"

const AccountInfo: React.FC = () => {
  const { navigate } = useNavigation()
  const tmpUser = useAppSlector(state => state.tmpStore)

  const handleDeleteAccount = () => {}

  return (
    <SettingsScreenLayout>
      <View className="flex-1">
        <InputBlueBg title="Full Name">
          <Text className="text-white text-[16px]">{tmpUser.fullName}</Text>
          <SmButton
            text={"Edit"}
            onPress={() => {
              navigate("Settings", {
                screen: "EditName",
              })
            }}
          />
        </InputBlueBg>

        <InputBlueBg title="Mobile Number">
          <Text className="text-white text-[16px]">{tmpUser.phone}</Text>
          <View className="flex flex-row items-center">
            <AntDesign
              name="checkcircleo"
              size={14}
              color="#00CA23"
              style={{ marginRight: 10 }}
            />
            <SmButton
              text={"Change"}
              onPress={() => {
                navigate("Settings", { screen: "EditPhone" })
              }}
            />
          </View>
        </InputBlueBg>

        <InputBlueBg title="Email">
          <Text className="text-white text-[16px]">
            {tmpUser.email || "Enter Email address"}
          </Text>
          <View className="flex flex-row items-center">
            <AntDesign
              name="checkcircleo"
              size={14}
              color="#00CA23"
              style={{ marginRight: 10 }}
            />
            <SmButton
              text={"Add"}
              onPress={() => {
                navigate("Settings", { screen: "AddEmail" })
              }}
            />
          </View>
        </InputBlueBg>

        <InputBlueBg title="Password">
          <Text className="text-white text-[16px]">
            {"*".repeat(tmpUser.pswLength)}
          </Text>
          <SmButton text={"Change"} onPress={() => {}} />
        </InputBlueBg>
      </View>

      <View>
        <FlatButton
          text={"Delete Account"}
          onPress={handleDeleteAccount}
          variation="outlined"
        />
      </View>
    </SettingsScreenLayout>
  )
}

export default AccountInfo
