// REFERENCE: SignUp1

import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useAppDispatch } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { checkNumber } from "utils/services/auth"
import ProgressBar from "components/ProgressBar"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import BtnWithLoginRegister from "components/BtnWithLoginRegister"
import VerifyPhoneInput from "components/VerifyPhoneInput"

// Breaking the rules a bit here again
const Divider: React.FC = () => {
  return <View className="border-t border-gray-300/10" />
}

const VerifyPhone: React.FC = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const currentStep = 1
  const [formState, setFormState] = useState({ disabled: true, isValid: false })
  const [isPopupVisible, setPopupVisible] = useState(false)
  const [phone, setPhone] = useState("")

  useEffect(() => {
    const { isValid } = formState
    setFormState({ ...formState, disabled: !(phone.length > 0 && isValid) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone, formState.isValid])

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible)
  }

  const handleLogin = () => {
    ;(async () => {
      const phoneNum = "+61" + phone
      const resp = await checkNumber({
        phone: phoneNum,
      })

      if (typeof resp === "undefined") return

      if (resp.exists) {
        togglePopup()
        return
      }

      dispatch(tmpStoreAction.setItem("phone", phoneNum))
      navigation.navigate("Auth", { screen: "SignUpName" })
    })()
  }

  return (
    <GeneralScreenLayout marginTop="mt-8">
      <View className="flex-1">
        <View className="mb-16">
          <ProgressBar currentStep={currentStep} />
        </View>

        <View className="flex-1">
          <VerifyPhoneInput
            title="Enter your mobile number to get started"
            phone={phone}
            setPhone={setPhone}
            setIsValid={isValid => setFormState({ ...formState, isValid })}
          />
        </View>

        <BtnWithLoginRegister
          btnText="next"
          disabled={formState.disabled && !formState.isValid}
          setDisabled={disabled => setFormState({ ...formState, disabled })}
          onPress={handleLogin}
        />

        {/* TODO: need UI refactor to this popup component*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isPopupVisible}
          onRequestClose={togglePopup}
        >
          <TouchableWithoutFeedback onPress={() => togglePopup()}>
            <View className="flex-1 justify-center items-center bg-black/30">
              <View className="bg-[#2c2c2c] mx-2 rounded-md">
                <View className="p-4 flex gap-2">
                  <Text className="text-xl text-white text-center font-semibold lato-text">
                    This mobile number matches your existing account!
                  </Text>
                  <Text className="text-md text-white text-center font-semibold lato-text">
                    You already have an account with this contact info. Do you
                    want to create another account with the same mobile number?
                  </Text>
                </View>

                <Divider />

                <TouchableOpacity className="py-3" onPress={togglePopup}>
                  <Text className="text-center text-blue-500 text-[16px] lato-text font-semibold ">
                    Yes, use the same mobile number
                  </Text>
                </TouchableOpacity>

                <Divider />

                <TouchableOpacity className="py-3" onPress={togglePopup}>
                  <Text className="text-center text-[16px] text-white lato-text font-semibold ">
                    No, use a different number
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </GeneralScreenLayout>
  )
}

export default VerifyPhone
