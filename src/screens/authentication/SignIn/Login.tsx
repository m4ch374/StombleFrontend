// REFERENCE: Log in - Login with Mobile Number and Password

import { useEffect, useState } from "react"
import { TouchableWithoutFeedback, View, Text, Keyboard } from "react-native"
import BackgroundColour from "components/styled_components/BackgroundColour"
import PhoneNumberInput from "components/PhoneNumberInput"
import BtnWithLoginRegister from "components/BtnWithLoginRegister"
import { useNavigation, CommonActions } from "@react-navigation/native"
import { useAppDispatch } from "redux/hooks"
import { tokenAction } from "redux/reducers/tokens.reducer"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import LatoText from "components/styled_components/LatoText"
import { signIn } from "utils/services/auth"
import { getUserAccountInformation } from "utils/services/accountInfo"
import PasswordInput from "components/PasswordInput"

const HOST_URL = "https://stomble-users.s3.ap-southeast-2.amazonaws.com/"

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
        tmpStoreAction.setItem({ key: "pswLength", item: password.length }),
      )
      dispatch(
        tmpStoreAction.setItem({ key: "verifyWithPassword", item: true }),
      )

      // endpoint: get user info and store into tmpStore
      const userResp = await getUserAccountInformation()

      if (typeof userResp?.result === "undefined") return

      dispatch(
        tmpStoreAction.setItem({
          key: "userId",
          item: userResp.result.id,
        }),
      )
      dispatch(
        tmpStoreAction.setItem({
          key: "fullName",
          item: userResp.result.fullName,
        }),
      )
      dispatch(
        tmpStoreAction.setItem({
          key: "phone",
          item: userResp.result.phone,
        }),
      )
      dispatch(
        tmpStoreAction.setItem({
          key: "email",
          item: userResp.result.email,
        }),
      )
      dispatch(
        tmpStoreAction.setItem({
          key: "link_icon",
          item: HOST_URL + userResp.result.link_icon,
        }),
      )

      // TODO: need direct to verifyCode screen (endpoint under development)
      navigate.navigate("LoginRoot", { screen: "Home" })

      // Clears stack once user logs in
      // TODO: Haven't tested
      dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "LoginRoot" }],
        }),
      )
    })()
  }

  return (
    <BackgroundColour>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="h-full w-full flex-1 justify-between items-center mt-8">
          <View className="flex gap-6">
            <View>
              <LatoText classname="text-gray-lightest text-[14px] mb-4">
                Mobile Number
              </LatoText>
              <PhoneNumberInput
                setPhone={setPhone}
                isValid={isValid}
                setIsValid={setIsValid}
              />
            </View>

            <View>
              <LatoText classname="text-gray-lightest text-[14px] mb-4">
                Password
              </LatoText>
              <PasswordInput password={password} setPassword={setPassword} />
              {/* temporarily put here to indicate wrong login on screen, develop later */}
              {loginError && (
                <Text className="text-4 text-red-500">
                  Wrong phone number or password
                </Text>
              )}
              <Text
                className="text-[14px] text-secondary font-lato-bold my-4"
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
