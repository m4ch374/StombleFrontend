// REFERENCE: Setting - Personal - Change Password
import { View } from "react-native"
import React from "react"
import SettingsScreenLayout from "components/settings/SettingsScreenLayout"
import PasswordInput from "components/PasswordInput"
import FlatButton from "components/styled_components/FlatButton"
import { useNavigation } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { useAppSlector } from "redux/hooks"
import LatoText from "components/styled_components/LatoText"
import { changePassword } from "utils/services/auth"

const ChangePassword = () => {
  const tmpUser = useAppSlector(state => state.tmpStore)
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const [password, setPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")

  const handleChangePassword = () => {
    ;(async () => {
      // endpoint: /change-password
      const payload = {
        phone: tmpUser.phone,
        previousPassword: password,
        proposedPassword: newPassword,
      }
      const resp = await changePassword(payload)

      if (resp?.statusCode !== 200) return

      dispatch(
        tmpStoreAction.setState({
          ...tmpUser,
          pswLength: newPassword.length,
          message: "Password changed successfully",
        }),
      )
      navigate("Settings", { screen: "AccountInfoIndex" })
    })()
  }

  return (
    <SettingsScreenLayout>
      <View className="flex gap-4">
        <LatoText>
          You’ll be logged out of all sessions expect this one for security
          purposes.
        </LatoText>

        <View className="mb-[8px]">
          <LatoText classname="text-[12px] text-gray-lightest mb-2">
            Current Password
          </LatoText>
          <PasswordInput
            password={password}
            setPassword={setPassword}
            placeholder="Enter your current password"
          />
        </View>

        <View className="mb-[8px]">
          <LatoText classname="text-[12px] text-gray-lightest mb-2">
            New Password
          </LatoText>
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
