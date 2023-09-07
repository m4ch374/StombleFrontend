import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"
import LatoText from "./styled_components/LatoText"

type Props = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
}

export const VerifyCodeField = ({ value, setValue, setDisabled }: Props) => {
  const CELL_COUNT = 6
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  const [timer, setTimer] = useState(60)
  const [sendCode, setSendCode] = useState(false)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
    if (timer > 0 && !sendCode) {
      interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
    }

    if (timer === 0) {
      setSendCode(true)
    }

    return () => clearInterval(interval)
  }, [sendCode, timer])

  useEffect(() => {
    setDisabled(value.length !== CELL_COUNT)
  }, [setDisabled, value])

  // TODO: endpoint: re-send-code is ready
  const handleSendCode = () => {
    setSendCode(false)
    setTimer(60)
    console.log("on click send code")
  }

  return (
    <View className="">
      <View className="w-[300px] mb-16 ">
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
              className="w-[40px] h-[48px] flex justify-center rounded-md border border-solid border-gray-mid"
            >
              <Text
                key={index}
                className={` text-center text-white text-[16px]`}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
      </View>
      <View className="flex flex-row justify-center items-center">
        <Text className="text-7 text-white text-center font-lato-bold">
          Code expires in {timer} seconds.
        </Text>
        <TouchableOpacity disabled={!sendCode} onPress={handleSendCode}>
          <LatoText
            classname={`${
              sendCode ? "text-secondary" : "text-gray-darkest"
            } font-lato-bold ml-2`}
          >
            Resend code
          </LatoText>
        </TouchableOpacity>
      </View>
    </View>
  )
}
