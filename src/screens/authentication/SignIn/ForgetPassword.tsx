// REFERENCE: Log in - forgot password

import { View, Text, Keyboard, TouchableWithoutFeedback } from "react-native"
import { useEffect, useState } from "react"
import PhoneNumberInput from "components/PhoneNumberInput"
import BackgroundColour from "components/styled_components/BackgroundColour"
import BtnWithLoginRegister from "components/BtnWithLoginRegister"
import { useNavigation } from "@react-navigation/native"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { useAppDispatch } from "redux/hooks"
import LatoText from "components/styled_components/LatoText"
import { checkNumber } from "utils/services/auth"

const ForgetPassword = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const [isValid, setIsValid] = useState(true)
  const [disable, setDisabled] = useState(true)
  const [changeNumError, setChangeNumError] = useState(false)
  const [phone, setPhone] = useState({
    number: "",
    countryCode: "+61",
  })

  useEffect(() => {
    setDisabled(!isValid)
  }, [isValid])

  const handleOnPress = () => {
    ;(async () => {
      const resp = await checkNumber({
        phone: phone.countryCode + phone.number,
      })

      if (resp) {
        if (resp.exists == false) {
          setChangeNumError(true)
          return
        }
      }

      dispatch(
        tmpStoreAction.setState(state => {
          state.phone = phone.countryCode + phone.number
          state.verifyWithPassword = true
          return state
        }),
      )
      navigation.navigate("Auth", { screen: "SetUpPassword" })
    })()
  }

  return (
    <BackgroundColour>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="p-[16px] flex justify-between h-full">
          <View>
            <Text className="text-[14px] text-white mb-4 font-bold lato-text">
              Please reset your password for restoring the security of the
              account.
            </Text>
            <View>
              <LatoText classname="text-gray-lightest text-[14px] mb-4">
                Mobile Number
              </LatoText>
            </View>
            <PhoneNumberInput
              setPhone={setPhone}
              isValid={isValid}
              setIsValid={setIsValid}
            />
            {/* temporarily put here to indicate not existing phone number on screen, develop later */}
            {changeNumError && (
              <Text className="text-sm text-red-500">
                Phone number does not exist
              </Text>
            )}
          </View>
          <BtnWithLoginRegister
            action="signup"
            btnText={"CONTINUE"}
            disabled={disable}
            setDisabled={setDisabled}
            onPress={handleOnPress}
          />
        </View>
      </TouchableWithoutFeedback>
    </BackgroundColour>
  )
}

export default ForgetPassword
