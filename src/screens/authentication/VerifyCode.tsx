// REFERENCE: Log in - Verfiy code

import BackgroundColour from "../../components/styled_components/BackgroundColour"
import { useState, useEffect, useCallback } from "react"
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"
import FlatButton from "../../components/styled_components/FlatButton"

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
    console.log("code, phone:", value)
  }, [value])

  return (
    <BackgroundColour>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="p-12 flex justify-between h-full">
              <View className="h-[140px] flex justify-between">
                <CodeField
                  ref={ref}
                  {...props}
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={{}}
                  keyboardType="number-pad"
                  keyboardAppearance="dark"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <View
                      key={index}
                      className={`w-[40] h-[42] flex justify-center rounded border-[0.6px] border-solid border-white`}
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
                    +61*****23
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
                      onPress={() => {
                        setSendCode(false)
                        setTimer(60)
                        console.log("resend code")
                      }}
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
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </BackgroundColour>
  )
}

export default VerifyCode
