// REFERENCE: SignUp1

import { View } from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useAppDispatch } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { checkNumber } from "utils/services/auth"
import ProgressBar from "components/ProgressBar"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import BtnWithLoginRegister from "components/BtnWithLoginRegister"
import VerifyPhoneInput from "components/VerifyPhoneInput"
import SimplePopupAlert from "components/SimplePopupAlert"

const VerifyPhone: React.FC = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const currentStep = 1
  const [formState, setFormState] = useState({ disabled: true, isValid: false })
  const [isPopupVisible, setPopupVisible] = useState(false)
  const [phone, setPhone] = useState("")
  const [showModal, setShowModal] = useState(false)

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

        {/* TODO: waiting for endpoint ready to check for account limits */}
        <SimplePopupAlert
          showModal={showModal}
          setShowModal={setShowModal}
          alertMsg={
            "You have exceeded the limit of accounts registered with this phone number."
          }
        />
      </View>
    </GeneralScreenLayout>
  )
}

export default VerifyPhone
