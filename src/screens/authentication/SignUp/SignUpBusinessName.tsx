// REFERENCE: REGISTER-58

// Copied from shadow realm

import { useState } from "react"
import { View, TextInput } from "react-native"
import FlatButton from "components/styled_components/FlatButton"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import ProgressBar from "components/ProgressBar"
import Disclaimer from "components/Disclaimer"
import InputBlueBg from "components/settings/InputBlueBg"
import { Type } from "types/variantStyle"
import CustomColor from "constants/Colors"
import LatoText from "components/styled_components/LatoText"

const SignupBusinessName = () => {
  const currentStep = 8
  const [businessName, setBusinessName] = useState("")

  // TODO: connect apps, then /sign-up for business account and direct to Home
  const handlePress = () => {
    alert("Business set up for next step is under development")
  }

  return (
    <GeneralScreenLayout marginTop="mt-0">
      <View className="pt-8 flex-1 flex-col">
        <View className="mb-15">
          <ProgressBar totalSteps={8} currentStep={currentStep} />
        </View>
        <View className="mb-4">
          <InputBlueBg
            title="What’s your business name?"
            variant={Type.outlined}
          >
            <TextInput
              className="text-white text-base w-full h-full leading-[-2px]"
              value={businessName}
              onChangeText={setBusinessName}
              placeholder="Enter your business name"
              placeholderTextColor={CustomColor.gray.lighter}
              keyboardAppearance="dark"
            />
          </InputBlueBg>
        </View>
        <View className="mb-2">
          <LatoText classname="text-gray-lighter text-7">
            This name will be displayed as your profile name.
          </LatoText>
        </View>
      </View>

      <View>
        <Disclaimer />
        <FlatButton
          text="SIGN UP"
          disabled={businessName === ""}
          onPress={handlePress}
        />
      </View>
    </GeneralScreenLayout>
  )
}
export default SignupBusinessName
