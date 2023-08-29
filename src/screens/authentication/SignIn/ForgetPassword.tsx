// REFERENCE: Log in - forgot password

import { View, Text, Keyboard, TouchableWithoutFeedback } from "react-native"
import { useEffect, useState } from "react"
import PhoneNumberInput from "components/PhoneNumberInput"
import BackgroundColour from "components/styled_components/BackgroundColour"
import BtnWithLoginRegister from "components/BtnWithLoginRegister"
import { useNavigation } from "@react-navigation/native"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { useAppDispatch } from "redux/hooks"
import Fetcher from "utils/Fetcher"
import { TCheckNum } from "types/endpoints"
import { authEP } from "constants/Endpoint"

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
      const resp = await Fetcher.init<TCheckNum>("POST", authEP.CHECK_NUMBER)
        .withJsonPaylad({
          phone: phone.countryCode + phone.number,
        })
        .fetchData() // Fetch data console.logs the error automatically (see ./utils/Fetcher.ts)

      if (resp) {
        if (resp.exists == false) {
          setChangeNumError(true)
          return
        }
      }

      console.log("resp:", resp)
      dispatch(
        tmpStoreAction.setItem({
          key: "phone",
          item: phone.countryCode + phone.number,
        }),
      )
      dispatch(
        tmpStoreAction.setItem({
          key: "verifyWithPassword",
          item: true,
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
            <Text
              className="text-[14px] text-white mb-4"
              style={{ fontFamily: "Lato-700" }}
            >
              Please reset your password for restoring the security of the
              account.
            </Text>
            <View>
              <Text
                className="text-white text-sm mb-2"
                style={{ fontFamily: "Lato-400" }}
              >
                Mobile Number
              </Text>
            </View>
            <PhoneNumberInput
              setPhone={setPhone}
              isValid={isValid}
              setIsValid={setIsValid}
            />
            {/* temporarily put here to indicate not existing phone number on screen, develop later */}
            {changeNumError && (
              <Text className="text-4 text-red-500">
                Phone number does not exist
              </Text>
            )}
          </View>
          <BtnWithLoginRegister
            btnText={"CONTINUE"}
            disabled={disable}
            setDisabled={setDisabled}
            onPress={handleOnPress}
            ableToLogin={false}
          />
        </View>
      </TouchableWithoutFeedback>
    </BackgroundColour>
  )
}

export default ForgetPassword
