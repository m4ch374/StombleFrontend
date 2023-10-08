// REFERENCE: Set Up Password

import { View, Text } from "react-native"
import React, { useMemo, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import FlatButton from "components/styled_components/FlatButton"
import PasswordInput from "components/PasswordInput"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { forgotPassword, preSignUp } from "utils/services/auth"
import ProgressBar from "components/ProgressBar"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import LatoText from "components/styled_components/LatoText"
import IconCheck from "assets/icons/InconCheck"
import IconCircleCheck from "assets/icons/IconCircleCheck"

// Breaking the rules here a bit
type TPasswordCheck = {
  children: string
  criteria: () => boolean
}

const PasswordCheck: React.FC<TPasswordCheck> = ({ children, criteria }) => {
  return (
    <Text
      className={`${
        criteria() ? "text-green-500/90" : "text-gray-mid"
      } text-[14px]`}
    >
      <Text>{criteria() ? <IconCheck /> : "• "}</Text>
      <Text>{children}</Text>
    </Text>
  )
}

const SetUpPassword = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const tmpVars = useAppSlector(state => state.tmpStore)
  const currentStep = 5 // Set the current step for this page

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testRegexp])

  const handleSetPassword = () => {
    ;(async () => {
      const payload = {
        phone: tmpVars.phone,
        password: confirm,
        fullName: tmpVars.fullName,
        birthday: tmpVars.birthday,
        gender: tmpVars.gender,
      }

      const resp = tmpVars.verifyWithPassword
        ? await forgotPassword({ phone: tmpVars.phone })
        : await preSignUp(payload)

      // Another ebic leetcode syntax
      if (typeof resp === "undefined") return

      dispatch(tmpStoreAction.setItem("password", confirm))
      navigation.navigate("Auth", { screen: "VerifyCode" })
    })()
  }

  return (
    <GeneralScreenLayout marginTop="mt-8">
      <View className="flex-1">
        <View className="mb-16">
          <ProgressBar currentStep={currentStep} />
        </View>

        <View className="flex gap-4">
          <View>
            <LatoText classname="text-sm text-gray-lightest mb-4">
              New password
            </LatoText>

            <View className="relative">
              <PasswordInput
                password={password}
                setPassword={setPassword}
                placeholder="Enter your password"
              />

              {allMatches && (
                <IconCircleCheck
                  classname={"absolute right-24 top-7 w-10 h-10"}
                />
              )}
            </View>
          </View>

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

          <View>
            <LatoText classname="text-sm text-gray-lightest mb-4">
              Current new password
            </LatoText>
            <PasswordInput
              password={confirm}
              setPassword={setConfirm}
              placeholder="Re-enter your password"
            />
          </View>

          {password === confirm && allMatches && (
            <View className="flex flex-row items-center">
              <IconCircleCheck />
              <Text className="tex-base text-green-500/90 ml-4">
                Password match
              </Text>
            </View>
          )}
        </View>
      </View>

      <FlatButton
        text={"next"}
        disabled={password !== confirm || !allMatches}
        onPress={handleSetPassword}
      />
    </GeneralScreenLayout>
  )
}

export default SetUpPassword
