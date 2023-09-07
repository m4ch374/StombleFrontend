// REFERENCE: Setting - Personal - Close Account

//----------------------------------------------------------------
// Waiting for new design
//----------------------------------------------------------------
import { View, Text } from "react-native"
import { useEffect, useState } from "react"
import LinearBgLayout from "components/styled_components/LinearBgLayout"
import FlatButton from "components/styled_components/FlatButton"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"
import { useAppSlector } from "redux/hooks"

const VerifyCodeForLeave = () => {
  const tmp = useAppSlector(state => state.tmpStore)
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

  const handleSendCode = () => {
    setSendCode(false)
    setTimer(60)
    console.log("resend code") // CANNOT DO: /resend-code endpoint not working currently
  }

  return (
    <LinearBgLayout>
      <View className="flex-1">
        <Text className="text-white text-[14px] mb-4">
          To continue, complete the SMS verification to confirm that this
          accounts belongs to you. Tapping “Delete Account” will delete account
          Johan
        </Text>

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
        </View>
      </View>

      <FlatButton
        text={"CLOSE ACCOUNT"}
        onPress={() => {}}
        disabled={disable}
      />
    </LinearBgLayout>
  )
}

export default VerifyCodeForLeave