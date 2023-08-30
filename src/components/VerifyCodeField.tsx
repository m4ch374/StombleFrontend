import { useEffect } from "react"
import { View, Text } from "react-native"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"

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

  useEffect(() => {
    setDisabled(value.length !== CELL_COUNT)
  }, [value])

  return (
    <View className="w-[300px] ">
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
            className="w-[40px] h-[42px] flex justify-center rounded-md border border-solid border-gray-mid"
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
  )
}
