// Note: Phone Input Component

/* eslint-disable */
import { View, Text, Dimensions, Alert, Button } from "react-native"
import React, { FC, useEffect, useRef, useState } from "react"
import PhoneInput from "react-native-phone-number-input"
import { Ionicons } from "@expo/vector-icons"
import { isString } from "formik"

type Phone = {
  number: string
  countryCode: string
}

type PhoneNumberInputProps = {
  setPhone: React.Dispatch<React.SetStateAction<any>>
  isValid: boolean
  setIsValid: React.Dispatch<React.SetStateAction<any>>
}
const windowWidth = Dimensions.get("window").width

const PhoneNumberInput: FC<PhoneNumberInputProps> = ({
  setPhone,
  isValid,
  setIsValid,
}) => {
  const phoneInput = useRef<PhoneInput>(null)
  const [countryObj, setCountryObj] = useState<any>()
  const [value, setValue] = useState("")

  useEffect(() => {
    const checkPhoneValidation = () => {
      const checkValid = phoneInput.current?.isValidNumber(value)
      setIsValid(checkValid)
    }
    checkPhoneValidation()
  }, [countryObj, value])

  const onChangeCountry = (country: any) => {
    setPhone((phoneData: Phone) => ({
      ...phoneData,
      countryCode: "+" + country.callingCode[0].toString(),
    }))
    setCountryObj(country.name)
  }
  const onChangeText = (text: string) => {
    setValue(text)
    setPhone((phoneData: Phone) => ({
      ...phoneData,
      number: text,
    }))
  }

  return (
    <View className="mb-8">
      <PhoneInput
        withDarkTheme
        ref={phoneInput}
        placeholder="Phone Number"
        defaultValue={value}
        defaultCode="AU"
        layout="first"
        codeTextStyle={{ color: "white", height: 20 }}
        onChangeText={onChangeText}
        onChangeCountry={onChangeCountry}
        textInputProps={{
          placeholderTextColor: "#4F4F4F",
          selectionColor: "#FFFFFF",
        }}
        containerStyle={{
          height: 48,
          width: windowWidth - 32,
          borderRadius: 6,
          backgroundColor: "transparent",
          borderColor: "#fff",
          borderWidth: 1,
        }}
        textContainerStyle={{
          backgroundColor: "transparent",
          borderRadius: 0,
          paddingLeft: 10,
        }}
        textInputStyle={{
          height: 48,
          color: "#FFFFFF",
          fontSize: 16,
          lineHeight: 19,
          fontWeight: "400",
        }}
        countryPickerButtonStyle={{
          backgroundColor: "transparent",
          height: 42,
          width: "auto",
          paddingRight: 10,
          paddingLeft: 10,
          marginRight: 1,
          borderRadius: 0,
        }}
        renderDropdownImage={
          <View className="flex-row items-center">
            <Text className="text-base font-normal text-white">
              {countryObj?.name
                ? countryObj.name.toUpperCase().slice(0, 2)
                : "AU"}{" "}
            </Text>
            <Ionicons name="md-chevron-down" size={20} color="white" />
            <View className="w-0.5 h-6 bg-white ml-2 -mr-3"></View>
          </View>
        }
      />
      {value.length > 0 && !isValid && (
        <Text className="text-[#FF0000] text-[14px] leading-[22px] text-start mt-2">
          Please enter a valid phone number
        </Text>
      )}
    </View>
  )
}

export default PhoneNumberInput
