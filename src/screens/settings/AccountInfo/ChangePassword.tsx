// REFERENCE: Setting - Personal - Change Password
// Copy from Henry's Sup up password

import { View, Text } from "react-native"
import React, { useMemo } from "react"
import PasswordInput from "components/PasswordInput"
import FlatButton from "components/styled_components/FlatButton"
import { useNavigation } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { useAppSlector } from "redux/hooks"
import LatoText from "components/styled_components/LatoText"
import { changePassword } from "utils/services/auth"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"

// Breaking the rules here a bit
type TPasswordCheck = {
  children: string
  criteria: () => boolean
}

const PasswordCheck: React.FC<TPasswordCheck> = ({ children, criteria }) => {
  return (
    <Text
      className={`${
        criteria() ? "text-green-500/90" : "text-gray-mid"
      } text-sm`}
    >
      <Text>{criteria() ? "✔ " : "• "}</Text>
      <Text>{children}</Text>
    </Text>
  )
}

// Regex criteria collection
const regexpCollection = {
  charNum: /.{8,}/,
  hasUpper: /[A-Z]+/,
  hasLower: /[a-z]+/,
  hasNum: /[0-9]+/,
  hasSpecChar: /[^a-zA-Z0-9]+/, // I guess anything thats not alphanumerical are special chars (?)
} as const

const ChangePassword = () => {
  const tmpUser = useAppSlector(state => state.tmpStore)
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const [password, setPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")

  const testRegexp = (regexp: RegExp) => regexp.test(newPassword)
  const allMatches = useMemo(() => {
    return Object.values(regexpCollection).reduce((prev, curr) => {
      return prev && testRegexp(curr) //some funny brain stuff
    }, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testRegexp])

  const handleChangePassword = () => {
    ;(async () => {
      // endpoint: /change-password
      const payload = {
        phone: tmpUser.phone,
        previousPassword: password,
        proposedPassword: newPassword,
      }
      const resp = await changePassword(payload)

      if (resp?.statusCode !== 200) {
        // TODO: waiting for designer team to confirm how to implement this
        alert("Current password wrong")
        return
      }

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
    <GeneralScreenLayout>
      <View className="flex gap-4">
        <View className="mb-6">
          <LatoText classname="text-sm text-gray-lightest mb-4">
            Current password
          </LatoText>
          <PasswordInput
            password={password}
            setPassword={setPassword}
            placeholder="Enter your current password"
          />
        </View>

        <View className="mb-6">
          <LatoText classname="text-sm text-gray-lightest mb-4">
            New password
          </LatoText>
          <PasswordInput
            password={newPassword}
            setPassword={setNewPassword}
            placeholder="Enter your new password"
          />
        </View>

        <LatoText classname="text-gray-mid text-sm pl-4">
          Password must contain:
        </LatoText>

        {/*
              Uhhhhhh...... in hindsight i shouldve just mapped them with an array or something
              But im too lazy for that now im in the middle of developing it
              We could always go back and fix right..... ? - time capsule (9/8/2023)
            */}
        <View className="flex pl-4 pb-6">
          <PasswordCheck
            criteria={() => {
              return testRegexp(regexpCollection.charNum)
            }}
          >
            At least 8 characters
          </PasswordCheck>
          <PasswordCheck
            criteria={() => {
              return testRegexp(regexpCollection.hasUpper)
            }}
          >
            An uppercase character
          </PasswordCheck>
          <PasswordCheck
            criteria={() => {
              return testRegexp(regexpCollection.hasLower)
            }}
          >
            A lowercase character
          </PasswordCheck>
          <PasswordCheck
            criteria={() => {
              return testRegexp(regexpCollection.hasNum)
            }}
          >
            A number
          </PasswordCheck>
          <PasswordCheck
            criteria={() => {
              return testRegexp(regexpCollection.hasSpecChar)
            }}
          >
            A special character
          </PasswordCheck>
        </View>

        <View className="mb-[8px]">
          <LatoText classname="text-sm text-gray-lightest mb-4">
            Current new password
          </LatoText>
          <PasswordInput
            password={confirmPassword}
            setPassword={setConfirmPassword}
            placeholder="Re-enter your new password"
          />
        </View>
        {confirmPassword === newPassword && allMatches && (
          <Text className="text-[#ABABAB] text-[14px] text-green-500/90">
            ✔ Password match
          </Text>
        )}
      </View>
      <FlatButton
        text={"update password"}
        onPress={handleChangePassword}
        disabled={
          password.length === 0 ||
          newPassword.length === 0 ||
          confirmPassword.length === 0 ||
          !allMatches
        }
      />
    </GeneralScreenLayout>
  )
}

export default ChangePassword
