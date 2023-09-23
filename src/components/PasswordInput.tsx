import React, { useState } from "react"
import { View, TextInput, TouchableWithoutFeedback } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import CustomColor from "constants/Colors"

type PasswordInputProps = {
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
}

const PasswordInput = ({
  password,
  setPassword,
  placeholder,
}: PasswordInputProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  return (
    <View className="mb-2">
      <View className="h-24 bg-transparent rounded-md flex-row items-center justify-between px-8 border border-solid border-gray-mid">
        <TextInput
          className="text-white text-base w-[280px] leading-[-2px]"
          placeholder={placeholder || "Enter Password"}
          placeholderTextColor={CustomColor.gray.lighter}
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={(text: string) => setPassword(text)}
        />

        <TouchableWithoutFeedback
          onPress={() => setSecureTextEntry(!secureTextEntry)}
        >
          <Ionicons
            name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={CustomColor.gray.lighter}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default PasswordInput
