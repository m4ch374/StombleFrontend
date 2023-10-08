// REFERENCE: Log in - Verfiy code

import { useState } from "react"
import { View, Text, KeyboardAvoidingView, Platform } from "react-native"
import FlatButton from "components/styled_components/FlatButton"
import { useAppSlector } from "redux/hooks"
import { useNavigation } from "@react-navigation/native"
import { VerifyCodeField } from "components/VerifyCodeField"
import { confirmCode, confirmPreSignUp } from "utils/services/auth"
import ProgressBar from "components/ProgressBar"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"

const VerifyCode = () => {
  // const [timer, setTimer] = useState(60)
  // const [sendCode, setSendCode] = useState(false)
  const [code, setCode] = useState("")
  const [disabled, setDisabled] = useState(true)
  const tmp = useAppSlector(state => state.tmpStore)
  const navigate = useNavigation()
  const currentStep = 6 // Set the current step for this page

  const handleOnPress = () => {
    const { phone, verifyWithPassword, password } = tmp

    ;(async () => {
      const payload = {
        code,
        phone,
        ...(verifyWithPassword && { password }),
      }

      // endpoint: /confirm-code and /confirm-pre-sign-up
      const resp = verifyWithPassword
        ? await confirmCode(payload)
        : await confirmPreSignUp(payload)

      // Unresolved promises will be undefined
      if (typeof resp === "undefined") return

      verifyWithPassword
        ? navigate.navigate("LoginRoot", { screen: "Home" })
        : navigate.navigate("Auth", { screen: "ChooseAccountType" })
    })()
  }

  return (
    <GeneralScreenLayout marginTop="mt-8">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <View className="flex-1 justify-between h-full">
          <View className="flex items-center">
            <View className="mb-16 w-full">
              <ProgressBar currentStep={currentStep} />
            </View>
            <View className="mb-21">
              <Text className="text-[14px] text-white text-center mb-1">
                Enter the 6 digit code we send to
              </Text>
              <Text className="text-[14px] text-white text-center">
                {tmp.phone}04020202020.
              </Text>
            </View>

            <VerifyCodeField
              phone={tmp.phone}
              value={code}
              setValue={setCode}
              setDisabled={setDisabled}
            />
          </View>

          <FlatButton
            text={"VERIFY CODE"}
            disabled={disabled}
            onPress={handleOnPress}
          />
        </View>
      </KeyboardAvoidingView>
    </GeneralScreenLayout>
  )
}

export default VerifyCode
