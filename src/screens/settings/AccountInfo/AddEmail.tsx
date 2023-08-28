// REFERENCE: Settings - Add/Edit Email

import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import InputBlueBg from "components/settings/InputBlueBg"
import FlatButton from "components/styled_components/FlatButton"
import SettingsScreenLayout from "components/settings/SettingsScreenLayout"
import { accountEP } from "constants/Endpoint"
import { useState } from "react"
import { View, TextInput, Text } from "react-native"
import { useDispatch } from "react-redux"
import { useAppSlector } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { TSendCodeChangeAttribute } from "types/endpoints"
import Fetcher from "utils/Fetcher"

const AddEmail = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const [email, setEmail] = useState("")

  // A simple email validation
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  const handleSendCode = () => {
    if (!validateEmail(email)) return
    ;(async () => {
      // endpoint: send code change attribute - email
      const sendCodeResp = await Fetcher.init<TSendCodeChangeAttribute>(
        "POST",
        accountEP.SEND_CODE_CHANGE_ATTRIBUTE,
      )
        .withJsonPaylad({
          attribute: "email",
          value: email,
          userId: tmpUser.userId,
        })
        .withCurrentToken()
        .fetchData()

      if (typeof sendCodeResp === "undefined") return

      dispatch(
        tmpStoreAction.setItem({
          key: "email",
          item: email,
        }),
      )
      navigate("Settings", {
        screen: "VerifyCodeForUpdate",
        params: { email: email },
      })
    })()
  }

  return (
    <SettingsScreenLayout>
      <View>
        <InputBlueBg title="Email">
          <TextInput
            className="text-white text-[16px] w-full"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email address"
            placeholderTextColor="#8A8A8E"
            textContentType="emailAddress"
          />
        </InputBlueBg>
        {email.length > 0 && !validateEmail(email) && (
          <View className="flex flex-row items-center">
            <AntDesign name="exclamationcircleo" size={24} color="#F4222F" />
            <Text className="text-error mx-2">
              Please enter a valid email address
            </Text>
          </View>
        )}
      </View>
      <FlatButton
        text={"SEND CODE"}
        onPress={handleSendCode}
        disabled={!email.length} // TODO: add email validation
      />
    </SettingsScreenLayout>
  )
}

export default AddEmail
