// REFERENCE: Log in - Login with Mobile Number and Password

import { useEffect, useState } from "react"
import { TouchableWithoutFeedback, View, Text, Keyboard } from "react-native"
import BackgroundColour from "components/styled_components/BackgroundColour"
import PhoneNumberInput from "components/PhoneNumberInput"
import BtnWithLoginRegister from "components/BtnWithLoginRegister"
import PasswordInput from "components/PasswordInput"
import { useNavigation, CommonActions } from "@react-navigation/native"
import Fetcher from "utils/Fetcher"
import { TSignIn } from "types/endpoints"
import { useAppDispatch } from "redux/hooks"
import { tokenAction } from "redux/reducers/tokens.reducer"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { authEP } from "constants/Endpoint"

// This is the new way of navigating
// We dont need to type as much hahahahahhahhahahha
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

  // TODO LATER: integrate endpoint then navigate (VerifyCode)
  const handleLogin = () => {
    // Either this or wrap the whole thing in IIFE

    ;(async () => {
      const resp = await Fetcher.init<TSignIn>("POST", authEP.SIGN_IN)
        .withJsonPaylad({
          phone: phone.countryCode + phone.number,
          password: password,
        })
        .fetchData() // Fetch data console.logs the error automatically (see ./utils/Fetcher.ts)

      if (typeof resp === "undefined") {
        setLoginError(true)
        return
      }

      console.log("resp:", resp)

      dispatch(tokenAction.setToken(resp.AccessToken))
      dispatch(
        tmpStoreAction.setItem({
          key: "phone",
          item: phone.countryCode + phone.number,
        }),
      )
      dispatch(tmpStoreAction.setItem({ key: "password", item: password }))
      dispatch(
        tmpStoreAction.setItem({ key: "verifyWithPassword", item: true }),
      )

      // Temporary navigate to Home screen directly (verifyCode not working yet)
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
              onPress={() =>
                navigate.navigate("Auth", {
                  screen: "ForgetPassword",
                })
              }
            >
              Forgot Your Password?
            </Text>
            {/* temporarily put here to indicate wrong login on screen, develop later */}
            {loginError && (
              <Text className="text-4 text-red-500">
                Wrong phone number or password
              </Text>
            )}
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
