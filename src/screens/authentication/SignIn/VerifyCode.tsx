// REFERENCE: Log in - Verfiy code

import BackgroundColour from "components/styled_components/BackgroundColour"
import { useState, useEffect, useCallback } from "react"
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
import Fetcher from "utils/Fetcher"
import { TConfirm } from "types/endpoints"
import { useNavigation } from "@react-navigation/native"
import { authEP } from "constants/Endpoint"
import { VerifyCodeField } from "components/VerifyCodeField"

const VerifyCode = () => {
  const [timer, setTimer] = useState(60)
  const [sendCode, setSendCode] = useState(false)
  const [value, setValue] = useState("")
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

  const handleOnPress = useCallback(() => {
    const { phone, verifyWithPassword } = tmp

    // Should we move endpoint to a constant file?
    // Yes -- Yume
    const endpoint = verifyWithPassword
      ? authEP.CONFIRM_CODE
      : authEP.CONFIRM_PRE_SIGN_UP
    ;(async () => {
      const result = await Fetcher.init<TConfirm>("POST", endpoint)
        .withJsonPaylad({
          code: value,
          phone,
          ...(verifyWithPassword && { password: tmp.password }),
        })
        .fetchData()
      // Unresolved promises will be undefined
      if (typeof result === "undefined") return

      verifyWithPassword
        ? navigate.navigate("LoginRoot", { screen: "Home" })
        : navigate.navigate("Auth", { screen: "ChooseAccountType" })
    })()
  }, [navigate, tmp, value])

  const handleSendCode = () => {
    setSendCode(false)
    setTimer(60)
    console.log("resend code") // CANNOT DO: /resend-code endpoint not working currently
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
                value={value}
                setValue={setValue}
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
