// REFERENCE: settings - Verify code for updating phone number and email

import { KeyboardAvoidingView, View, Platform } from "react-native"
import { useState } from "react"
import FlatButton from "components/styled_components/FlatButton"
import { useAppSlector } from "redux/hooks"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { AccountInfoList } from "types/Navigation"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import LatoText from "components/styled_components/LatoText"
import { VerifyCodeField } from "components/VerifyCodeField"
import { updatePersonalInfo } from "utils/services/accountInfo"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"

const VerifyCodeForUpdate = () => {
  const route = useRoute<RouteProp<AccountInfoList, "VerifyCodeForUpdate">>()
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const [disabled, setDisabled] = useState(true)
  const [value, setValue] = useState("")

  const handleVerifyCode = () => {
    // endpoint: update user name to backend
    ;(async () => {
      const payload = {
        attribute: route.params.email ? "email" : "phone_number",
        userId: tmpUser.userId,
        value: route.params.email ? tmpUser.email : tmpUser.phone,
        code: value,
      } as const

      const resp = await updatePersonalInfo(payload)

      if (typeof resp === "undefined") return

      dispatch(
        tmpStoreAction.setState({
          ...tmpUser,
          message: route.params.email
            ? "Email updated successfully"
            : "Mobile Number updated successfully",
        }),
      )
      navigate("Settings", { screen: "AccountInfoIndex" })
    })()
  }

  return (
    <GeneralScreenLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={90}
      >
        <View className="flex-1">
          <View className="p-12 flex justify-between h-full">
            <View className="flex justify-between items-center">
              <View className="mb-16">
                <LatoText classname="text-center mb-1">
                  Enter the 6 digit code we send to
                </LatoText>
                <LatoText classname="text-center">
                  {route.params.phone || route.params.email}
                </LatoText>
              </View>

              <VerifyCodeField
                value={value}
                setValue={setValue}
                setDisabled={setDisabled}
              />
            </View>
          </View>
        </View>

        <FlatButton
          text={"VERIFY CODE"}
          onPress={handleVerifyCode}
          disabled={disabled}
        />
      </KeyboardAvoidingView>
    </GeneralScreenLayout>
  )
}

export default VerifyCodeForUpdate
