// REFERENCE: Log in - Login with Mobile Number and Password

import { useEffect, useState } from "react"
import { TouchableWithoutFeedback, View, Text, Keyboard } from "react-native"
import BackgroundColour from "components/styled_components/BackgroundColour"
import PhoneNumberInput from "components/PhoneNumberInput"
import BtnWithLoginRegister from "components/BtnWithLoginRegister"
import { useNavigation } from "@react-navigation/native"
import { useAppDispatch } from "redux/hooks"
import { tokenAction } from "redux/reducers/tokens.reducer"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import LatoText from "components/styled_components/LatoText"
import { signIn } from "utils/services/auth"
import PasswordInput from "components/PasswordInput"

const Login = () => {
  const navigate = useNavigation()
  const dispatch = useAppDispatch()

  const [isValid, setIsValid] = useState(true)
  const [disabled, setDisabled] = useState(true)
  const [loginError, setLoginError] = useState(false)
  const [phone, setPhone] = useState({
    number: "",
    countryCode: "+61",
  })
  const [password, setPassword] = useState("")

  useEffect(() => {
    setDisabled(!(phone.number.length > 0 && password.length > 0))
  }, [password, phone.number])

  const handleLogin = () => {
    ;(async () => {
      // endpoint: sign in with phone number and password
      const signInRes = await signIn({
        phone: phone.countryCode + phone.number,
        password: password,
      })

      if (typeof signInRes === "undefined") {
        setLoginError(true)
        return
      }

      dispatch(tokenAction.setToken(signInRes.AccessToken))
      dispatch(
        tmpStoreAction.setState(state => {
          state.pswLength = password.length
          state.verifyWithPassword = true
          return state
        }),
      )

      console.log("password", password.length)
      // TODO: need direct to verifyCode screen (endpoint under development)
      navigate.navigate("LoginRoot", { screen: "Home" })
    })()
  }

  return (
    <BackgroundColour>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="h-full w-full flex-1 justify-between items-center mt-8">
          <View className="flex gap-6">
            <View>
              <LatoText classname="text-gray-lightest text-sm mb-4">
                Mobile Number
              </LatoText>
              <PhoneNumberInput
                setPhone={setPhone}
                isValid={isValid}
                setIsValid={setIsValid}
              />
            </View>

            <View>
              <LatoText classname="text-gray-lightest text-sm mb-4">
                Password
              </LatoText>
              <PasswordInput password={password} setPassword={setPassword} />
              {/* temporarily put here to indicate wrong login on screen, develop later */}
              {loginError && (
                <Text className="text-sm text-red-500">
                  Wrong phone number or password
                </Text>
              )}
              <Text
                className="text-sm text-secondary font-lato-bold my-4 cursor-pointer"
                onPress={() =>
                  navigate.navigate("Auth", {
                    screen: "ForgetPassword",
                  })
                }
              >
                Forgot Your Password?
              </Text>
            </View>
          </View>

          <BtnWithLoginRegister
            btnText="LOG IN"
            ableToLogin={false}
            disabled={disabled}
            setDisabled={setDisabled}
            onPress={handleLogin}
          />
        </View>
      </TouchableWithoutFeedback>
    </BackgroundColour>
  )
}
export default Login
