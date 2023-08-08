// REFERENCE: Log in - Login with Mobile Number and Password

import { useEffect, useState } from "react"
import { TouchableWithoutFeedback, View, Text, Keyboard } from "react-native"
import BackgroundColour from "../../components/styled_components/BackgroundColour"
import PhoneNumberInput from "../../components/PhoneNumberInput"
import BtnWithLoginRegister from "../../components/BtnWithLoginRegister"
import PasswordInput from "../../components/passwordInput"
import { useNavigation } from "@react-navigation/native"

// This is the new way of navigating
// We dont need to type as much hahahahahhahhahahha
const Login = () => {
  const navigate = useNavigation()

  const [isValid, setIsValid] = useState(true)
  const [disabled, setDisabled] = useState(true)
  const [phone, setPhone] = useState({
    number: "",
    countryCode: "+61",
  })
  const [password, setPassword] = useState("")

  useEffect(() => {
    setDisabled(!(phone.number.length > 0 && password.length > 0))
  }, [password, phone.number])

  // TODO: integrate endpoint then navigate (VerifyCode)
  const handleOnPress = () => {
    navigate.navigate("Auth", {
      screen: "VerifyCode",
    })
  }

  return (
    <BackgroundColour>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="h-full flex justify-between">
          <View className="p-4">
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
            <PasswordInput password={password} setPassword={setPassword} />
            <Text
              className="text-4 text-[#FFFFFF]"
              onPress={() => navigate.navigate("Auth", {
                screen: "ForgetPassword",
              })}
            >
              Forgot Your Password?
            </Text>
          </View>

          <BtnWithLoginRegister
            btnText="LOG IN"
            ableToLogin={false}
            disabled={disabled}
            setDisabled={setDisabled}
            onPress={handleOnPress}
          />
        </View>
      </TouchableWithoutFeedback>
    </BackgroundColour>
  )
}
export default Login
