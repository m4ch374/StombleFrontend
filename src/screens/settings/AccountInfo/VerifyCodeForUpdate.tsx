// REFERENCE: settings - Verify code for updating phone number and email

import { View, Text } from "react-native"
import { useEffect, useState } from "react"
import FlatButton from "components/styled_components/FlatButton"
import { useAppSlector } from "redux/hooks"
import SettingsScreenLayout from "components/settings/SettingsScreenLayout"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { AccountInfoList } from "types/Navigation"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import LatoText from "components/styled_components/LatoText"
import { VerifyCodeField } from "components/VerifyCodeField"
import { updatePersonalInfo } from "utils/services/accountInfo"

const VerifyCodeForUpdate = () => {
  const route = useRoute<RouteProp<AccountInfoList, "VerifyCodeForUpdate">>()
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const [timer, setTimer] = useState(60)
  const [sendCode, setSendCode] = useState(false)
  const [disable, setDisabled] = useState(true)
  const [value, setValue] = useState("")

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

  const handleVerifyCode = () => {
    // endpoint: update user name to backend
    ;(async () => {
      const payload = {
        attribute: route.params.email ? "email" : "phone_number",
        userId: tmpUser.userId,
        value: route.params.email ? tmpUser.email : tmpUser.phone,
        code: value,
      } as const

      const resp = await updatePersonalInfo(payload)

      if (typeof resp === "undefined") return

      // TODO: need return a success message back to AccountInfo screen
      dispatch(
        tmpStoreAction.setItem({
          key: "message",
          item: route.params.email
            ? "Email updated successfully"
            : "Mobile number updated successfully",
        }),
      )
      navigate("Settings", { screen: "AccountInfoIndex" })
    })()
  }

  const handleSendCode = () => {
    setSendCode(false)
    setTimer(60)
    console.log("resend code") // TODO: /re-send-code is ready
  }

  return (
    <SettingsScreenLayout>
      <View className="flex-1">
        <View className="p-12 flex justify-between h-full">
          <View className="h-[140px] flex justify-between">
            <View className="my-4">
              <LatoText classname="text-center mb-1">
                Enter the 6 digit code we send to
              </LatoText>
              <LatoText classname="text-center">
                {route.params.phone || route.params.email}
              </LatoText>
            </View>
            {/* TODO: have new design */}
            <VerifyCodeField
              value={value}
              setValue={setValue}
              setDisabled={setDisabled}
            />
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
        text={"VERIFY CODE"}
        onPress={handleVerifyCode}
        disabled={disable}
      />
    </SettingsScreenLayout>
  )
}

export default VerifyCodeForUpdate
