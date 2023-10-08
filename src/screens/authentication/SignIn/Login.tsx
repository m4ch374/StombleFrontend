// REFERENCE: Log in - Login with Mobile Number and Password

import { useEffect, useState } from "react"
import { View, Text } from "react-native"
import BtnWithLoginRegister from "components/BtnWithLoginRegister"
import { useNavigation } from "@react-navigation/native"
import { useAppDispatch } from "redux/hooks"
import { tokenAction } from "redux/reducers/tokens.reducer"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import LatoText from "components/styled_components/LatoText"
import { signIn } from "utils/services/auth"
import PasswordInput from "components/PasswordInput"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import ErrorMessage from "components/ErrorMessage"
import VerifyPhoneInput from "components/VerifyPhoneInput"

const Login = () => {
  const navigate = useNavigation()
  const dispatch = useAppDispatch()
  const [isValid, setIsValid] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [loginError, setLoginError] = useState(false)
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    setDisabled(
      !(phone.length > 0 && password.length > 0 && isValid && !loginError),
    )
  }, [password, phone, isValid, loginError])

  const handleLogin = () => {
    ;(async () => {
      const phoneNum = "+61" + phone
      // endpoint: sign in with phone number and password
      const signInRes = await signIn({
        phone: phoneNum,
        password: password,
      })

      if (typeof signInRes === "undefined") {
        setLoginError(true)
        return
      }

      dispatch(tokenAction.setToken(signInRes.AccessToken))
      dispatch(tokenAction.setRefresh(signInRes.RefreshToken))
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
    <GeneralScreenLayout>
      <View className="flex gap-8">
        <View>
          <VerifyPhoneInput
            phone={phone}
            setPhone={setPhone}
            setIsValid={setIsValid}
          />
        </View>

        <View>
          <LatoText classname="text-sm text-gray-lightest mb-4">
            Password
          </LatoText>
          <PasswordInput
            password={password}
            setPassword={setPassword}
            placeholder="Enter your password"
          />

          <Text
            className="text-sm text-secondary font-lato-bold my-2 cursor-pointer"
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

      <View>
        <BtnWithLoginRegister
          action="signup"
          btnText="next"
          disabled={disabled}
          setDisabled={setDisabled}
          onPress={handleLogin}
        />

        {loginError && (
          <ErrorMessage
            setLoginError={setLoginError}
            setPhone={setPhone}
            setPassword={setPassword}
          />
        )}
      </View>
    </GeneralScreenLayout>
  )
}
export default Login
