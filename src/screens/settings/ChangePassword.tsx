// REFERENCE: Setting - Personal - Change Password
import { View, Text } from "react-native"
import React from "react"
import SettingsScreenLayout from "components/styled_components/SettingsScreenLayout"
import PasswordInput from "components/passwordInput"
import FlatButton from "components/styled_components/FlatButton"
import { useNavigation } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import Fetcher from "utils/Fetcher"
import { TChangePassword } from "types/endpoints"
import { authEP } from "constants/Endpoint"
import { useAppSlector } from "redux/hooks"

const ChangePassword = () => {
  const tmpUser = useAppSlector(state => state.tmpStore)
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const [password, setPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")

  const handleChangePassword = () => {
    // TODO: change password endpoint
    ;(async () => {
      const resp = await Fetcher.init<TChangePassword>(
        "POST",
        authEP.CHANGE_PASSWORD,
      )
        .withJsonPaylad({
          phone: tmpUser.phone,
          previousPassword: password,
          proposedPassword: newPassword,
        })
        .withCurrentToken()
        .fetchData()

      if (resp?.statusCode !== 200) return

      dispatch(
        tmpStoreAction.setItem({ key: "pswLength", item: newPassword.length }),
      )
      dispatch(
        tmpStoreAction.setItem({
          key: "message",
          item: "Password changed successfully",
        }),
      )
      navigate("Settings", { screen: "AccountInfo" })
    })()
  }

  return (
    <SettingsScreenLayout>
      <View className="flex gap-4">
        <Text className="text-white font-[16px]">
          You’ll be logged out of all sessions expect this one for security
          purposes.
        </Text>

        <View className="mb-[8px]">
          <Text className="text-[12px] text-textTert mb-2">
            Current Password
          </Text>
          <PasswordInput
            password={password}
            setPassword={setPassword}
            placeholder="Enter your current password"
          />
        </View>

        <View className="mb-[8px]">
          <Text className="text-[12px] text-textTert mb-2">New Password</Text>
          <PasswordInput
            password={newPassword}
            setPassword={setNewPassword}
            placeholder="Enter your new password"
          />
        </View>
      </View>
      <FlatButton
        text={"CHANGE PASSWORD"}
        onPress={handleChangePassword}
        disabled={password.length === 0 || newPassword.length === 0}
      />
    </SettingsScreenLayout>
  )
}

export default ChangePassword
