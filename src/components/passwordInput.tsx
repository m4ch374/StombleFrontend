import React, { useState } from "react"
import { View, TextInput, TouchableWithoutFeedback } from "react-native"
import { Ionicons } from "@expo/vector-icons"

type PasswordInputProps = {
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
}

const PasswordInput = ({ password, setPassword }: PasswordInputProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  return (
    <View className="mb-2">
      <View className="h-12 bg-transparent rounded-md flex-row items-center justify-between px-3 border border-solid border-white">
        <TextInput
          className="text-white py-auto text-base leading-[16px] w-[280px] h-5"
          style={{ fontFamily: "Lato-700" }}
          placeholder="Enter Password"
          placeholderTextColor="#ABABAB"
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableWithoutFeedback
          className="flex-1"
          onPress={() => setSecureTextEntry(!secureTextEntry)}
        >
          <Ionicons
            name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#C1C1C1"
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default PasswordInput
