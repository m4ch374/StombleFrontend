// REFERENCE: Settings - Add/Edit Email

import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import InputBlueBg from "components/settings/InputBlueBg"
import FlatButton from "components/styled_components/FlatButton"
import { useState } from "react"
import { View, TextInput, Text } from "react-native"
import { useDispatch } from "react-redux"
import { useAppSlector } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import CustomColor from "constants/Colors"
import { sendCodeChangeAttribute } from "utils/services/accountInfo"
import { Type } from "types/variantStyle"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"

// A simple email validation
const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

const AddEmail = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const [email, setEmail] = useState("")
  const [isValid, setIsValid] = useState(false)

  const handleSendCode = () => {
    if (!validateEmail(email)) return
    ;(async () => {
      // endpoint: /send-code-change-attribute - email
      const payload = {
        attribute: "email",
        value: email,
        userId: tmpUser.userId,
      } as const

      const sendCodeResp = await sendCodeChangeAttribute(payload)

      if (typeof sendCodeResp === "undefined") return

      dispatch(tmpStoreAction.setItem("email", email))
      navigate("Settings", {
        screen: "VerifyCodeForUpdate",
        params: { email: email },
      })
    })()
  }

  const handleOnblur = () => {
    if (email.length > 0 && !validateEmail(email)) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  return (
    <GeneralScreenLayout>
      <View className="flex gap-2">
        <InputBlueBg title="Email address" variant={Type.outlined}>
          <TextInput
            className="text-white text-base w-full h-full"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email address"
            placeholderTextColor={CustomColor.gray.lighter}
            textContentType="emailAddress"
            keyboardAppearance="dark"
            onBlur={handleOnblur}
          />
        </InputBlueBg>
        {isValid && (
          <View className="flex flex-row items-center">
            <AntDesign
              name="exclamationcircleo"
              size={24}
              color={CustomColor.util.error}
            />
            <Text className="text-util-error mx-2">
              Please enter a valid email address
            </Text>
          </View>
        )}
      </View>
      <FlatButton
        text={"SEND CODE"}
        onPress={handleSendCode}
        disabled={!validateEmail(email)}
      />
    </GeneralScreenLayout>
  )
}

export default AddEmail
