// REFERENCE: Log in - Verfiy code

import BackgroundColour from "components/styled_components/BackgroundColour"
import { useState, useEffect, useCallback } from "react"
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"
import FlatButton from "components/styled_components/FlatButton"
import { useAppSlector } from "redux/hooks"
import Fetcher from "utils/Fetcher"
import { TConfirm } from "types/endpoints"
import { useNavigation } from "@react-navigation/native"
import { authEP } from "constants/Endpoint"

const VerifyCode = () => {
  const CELL_COUNT = 6
  const [timer, setTimer] = useState(60)
  const [sendCode, setSendCode] = useState(false)
  const [disable, setDisabled] = useState(true)
  const [value, setValue] = useState("")
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  const tmp = useAppSlector(state => state.tmpStore)
  const navigate = useNavigation()

  useEffect(() => {
    setDisabled(value.length !== CELL_COUNT)
  }, [value])

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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <SafeAreaView>
            <View className="p-12 flex justify-between h-full">
              <View className="h-[140px] flex justify-between">
                <CodeField
                  ref={ref}
                  {...props}
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  keyboardType="number-pad"
                  keyboardAppearance="dark"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <View
                      key={index}
                      className="w-[40px] h-[42px] flex justify-center rounded border border-solid border-white"
                    >
                      <Text
                        key={index}
                        className={` text-center text-24 text-white text-[16px]`}
                        style={{ fontFamily: "Lato-700" }}
                        onLayout={getCellOnLayoutHandler(index)}
                      >
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    </View>
                  )}
                />

                <View className="my-4">
                  <Text className="text-14 text-white text-center mb-1">
                    Enter the 6 digit code we send to
                  </Text>
                  <Text className="text-14 text-white text-center">
                    {tmp.phone}
                  </Text>
                </View>
                <View>
                  {!sendCode ? (
                    <Text className="text-16 text-white text-center font">
                      Resend code in {timer} seconds
                    </Text>
                  ) : (
                    <Text
                      className="text-16 text-white text-center font-bold"
                      onPress={handleSendCode}
                    >
                      Resend code
                    </Text>
                  )}
                </View>
              </View>

              <FlatButton
                text={"VERIFY CODE"}
                disabled={disable}
                onPress={handleOnPress}
              />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </BackgroundColour>
  )
}

export default VerifyCode
