// REFERENCE: Set Up Password

import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native"
import React, { useMemo, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import FlatButton from "../../../components/styled_components/FlatButton"
import BackgroundColour from "../../../components/styled_components/BackgroundColour"
import PasswordInput from "../../../components/passwordInput"
import { useAppDispatch, useAppSlector } from "../../../redux/hooks"
import { tmpStoreAction } from "../../../redux/reducers/tmpStore.reducer"
import Fetcher from "../../../utils/Fetcher"
import { TForgotPassword } from "../../../types/endpoints"

// Breaking the rules here a bit
type TPasswordCheck = {
  children: string
  criteria: () => boolean
}

const PasswordCheck: React.FC<TPasswordCheck> = ({ children, criteria }) => {
  return (
    <Text
      className={`${
        criteria() ? "text-green-500/90" : "text-[#ABABAB]"
      } text-[14px]`}
    >
      <Text>{criteria() ? "✔ " : "• "}</Text>
      <Text>{children}</Text>
    </Text>
  )
}

const SetUpPassword = () => {
  const navigation = useNavigation()
  const phoneNum = useAppSlector((state) => state.tmpStore.phone)
  const dispatch = useAppDispatch()

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  // Regex criteria collection
  const regexpCollection = {
    charNum: /.{8,}/,
    hasUpper: /[A-Z]+/,
    hasLower: /[a-z]+/,
    hasNum: /[0-9]+/,
    hasSpecChar: /[^a-zA-Z0-9]+/, // I guess anything thats not alphanumerical are special chars (?)
  } as const

  const testRegexp = (regexp: RegExp) => regexp.test(password)
  const allMatches = useMemo(() => {
    return Object.values(regexpCollection).reduce((prev, curr) => {
      return prev && testRegexp(curr) //some funny brain stuff
    }, true)
  }, [password])

  const handleSetPassword = () => {
    // TODO: i guess the pre-sign-up thing if i remember correctly? idk

    (async () => {
      const resp = await Fetcher.init<TForgotPassword>(
        "POST",
        "/forgot-password",
      )
        .withJsonPaylad({
          phone: phoneNum,
        })
        .fetchData() // Fetch data console.logs the error automatically (see ./utils/Fetcher.ts)

      if (typeof resp === "undefined") {
        return
      }

      console.log("resp:", resp)

      dispatch(tmpStoreAction.setItem({ key: "phone", item: phoneNum }))
      dispatch(tmpStoreAction.setItem({ key: "password", item: confirm }))
      dispatch(
        tmpStoreAction.setItem({ key: "verifyWithPassword", item: true }),
      )
      navigation.navigate("Auth", { screen: "VerifyCode" })
    })()
  }

  return (
    <BackgroundColour>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="px-4 pb-10 flex justify-between h-full">
          <View>
            <View className="mb-[24px]">
              <Text
                className="text-white text-[16px] font-semibold"
                style={{ fontFamily: "Lato-400" }}
              >
                Set up a password for extra security.
              </Text>
            </View>

            <View className="mb-[8px]">
              <Text
                className="text-[12px] text-[#FFFFFF60]"
                style={{ fontFamily: "Lato-400" }}
              >
                New Password
              </Text>
            </View>

            <PasswordInput password={password} setPassword={setPassword} />

            <Text className="text-[#ABABAB] text-[14px]">
              Password must contain:
            </Text>

            {/* 
              Uhhhhhh...... in hindsight i shouldve just mapped them with an array or something
              But im too lazy for that now im in the middle of developing it
              We could always go back and fix right..... ? - time capsule (9/8/2023)
            */}
            <View className="flex pl-4 pb-10">
              <PasswordCheck
                criteria={() => {
                  return testRegexp(regexpCollection.charNum)
                }}
              >
                At least 8 characters
              </PasswordCheck>
              <PasswordCheck
                criteria={() => {
                  return testRegexp(regexpCollection.hasUpper)
                }}
              >
                An uppercase character
              </PasswordCheck>
              <PasswordCheck
                criteria={() => {
                  return testRegexp(regexpCollection.hasLower)
                }}
              >
                A lowercase character
              </PasswordCheck>
              <PasswordCheck
                criteria={() => {
                  return testRegexp(regexpCollection.hasNum)
                }}
              >
                A number
              </PasswordCheck>
              <PasswordCheck
                criteria={() => {
                  return testRegexp(regexpCollection.hasSpecChar)
                }}
              >
                A special character
              </PasswordCheck>
            </View>

            <View className="mb-[8px]">
              <Text
                className="text-[12px] text-[#FFFFFF60]"
                style={{ fontFamily: "Lato-400" }}
              >
                Confirm New Password
              </Text>
            </View>

            <PasswordInput password={confirm} setPassword={setConfirm} />

            {password === confirm && (
              <Text className="text-[#ABABAB] text-[14px] text-green-500/90">
                ✔ Password match
              </Text>
            )}
          </View>

          <FlatButton
            text={"VERIFY CODE"}
            disabled={password !== confirm || !allMatches}
            onPress={handleSetPassword}
          />
        </View>
      </TouchableWithoutFeedback>
    </BackgroundColour>
  )
}

export default SetUpPassword
