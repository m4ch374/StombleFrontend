// REFERENCE: SignUp2

import { TextInput, View } from "react-native"
import FlatButton from "components/styled_components/FlatButton"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { useState } from "react"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { useNavigation } from "@react-navigation/native"
import ProgressBar from "components/ProgressBar"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import InputBlueBg from "components/settings/InputBlueBg"
import { Type } from "types/variantStyle"
import CustomColor from "constants/Colors"

// TODO: Lint
/* eslint-disable */
const SignUpName = () => {
  const { navigate } = useNavigation()
  const dispatch = useAppDispatch()
  const currentStep = 2
  // We are using whatever name saved in our redux storage as default
  const name = useAppSlector(state => state.tmpStore.fullName)
  const [fullname, setFullname] = useState(name)

  return (
    <GeneralScreenLayout marginTop="mt-8">
      <View className="flex-1">
        <View className="mb-16">
          <ProgressBar currentStep={currentStep} />
        </View>

        <View className="flex-1">
          <InputBlueBg title="What is your full name?" variant={Type.outlined}>
            <TextInput
              className="text-white text-base w-full h-full leading-[-2px]"
              value={fullname}
              onChangeText={setFullname}
              placeholder="Enter your full name"
              placeholderTextColor={CustomColor.gray.lighter}
              keyboardAppearance="dark"
            />
          </InputBlueBg>
        </View>

        <FlatButton
          text="next"
          disabled={!fullname.trim()}
          onPress={() => {
            if (fullname.trim()) {
              dispatch(tmpStoreAction.setItem("fullName", fullname.trim()))
              navigate("Auth", { screen: "SignUpDOB" })
            }
          }}
        />
      </View>
    </GeneralScreenLayout>
  )
}

export default SignUpName
