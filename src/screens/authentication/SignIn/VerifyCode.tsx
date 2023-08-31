// REFERENCE: Log in - Verfiy code

import BackgroundColour from "components/styled_components/BackgroundColour"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import FlatButton from "components/styled_components/FlatButton"
import { useAppSlector } from "redux/hooks"
import { useNavigation } from "@react-navigation/native"
import { VerifyCodeField } from "components/VerifyCodeField"
import { confirmCode, confirmPreSignUp } from "utils/services/auth"

const VerifyCode = () => {
  const [timer, setTimer] = useState(60)
  const [sendCode, setSendCode] = useState(false)
  const [code, setCode] = useState("")
  const [disabled, setDisabled] = useState(true)
  const tmp = useAppSlector(state => state.tmpStore)
  const navigate = useNavigation()

  useEffect(() => {
    let interval: NodeJS.Timer
    if (timer > 0 && !sendCode) {
      interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
    } else {
      setSendCode(true)
    }
    return () => clearInterval(interval)
  }, [sendCode, timer])

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

  const handleSendCode = () => {
    setSendCode(false)
    setTimer(60)
    console.log("resend code") // TODO: /re-send-code endpoint is ready
  }

  return (
    <BackgroundColour>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="mt-16 p-12 flex-1 justify-between h-full">
            <View className="h-[250px] flex justify-evenly items-center">
              <View className="my-8">
                <Text className="text-[14px] text-white text-center mb-1">
                  Enter the 6 digit code we send to
                </Text>
                <Text className="text-[14px] text-white text-center">
                  {tmp.phone}
                </Text>
              </View>

              <VerifyCodeField
                value={code}
                setValue={setCode}
                setDisabled={setDisabled}
              />

              <View className="my-8">
                {!sendCode ? (
                  <Text className="text-[16px] text-white text-center font">
                    Resend code in {timer} seconds
                  </Text>
                ) : (
                  <Text
                    className="text-[16px] text-white text-center font-bold"
                    onPress={handleSendCode}
                  >
                    Resend code
                  </Text>
                )}
              </View>
            </View>

            <FlatButton
              text={"VERIFY CODE"}
              disabled={disabled}
              onPress={handleOnPress}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </BackgroundColour>
  )
}

export default VerifyCode
