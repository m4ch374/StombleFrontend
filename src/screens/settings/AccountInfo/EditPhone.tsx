// REFERENCE: Setting - Personal - Edit Phone
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { useState } from "react"
import FlatButton from "components/styled_components/FlatButton"
import { useNavigation } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import LatoText from "components/styled_components/LatoText"
import { sendCodeChangeAttribute } from "utils/services/accountInfo"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import { checkNumber } from "utils/services/auth"
import VerifyPhoneInput from "components/VerifyPhoneInput"

const EditPhone = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const [isPopupVisible, setPopupVisible] = useState(false)
  const [isValid, setIsValid] = useState<boolean>(false)
  const [phone, setPhone] = useState("")

  const handleSendCode = () => {
    ;(async () => {
      const phoneNum = "+61" + phone
      const resp = await checkNumber({
        phone: phoneNum,
      })

      if (typeof resp === "undefined") return

      if (resp.exists) {
        setIsValid(false)
        setPopupVisible(true)
        return
      }

      // endpoint: /send-code-change-attribute - phone_number
      const payload = {
        attribute: "phone_number",
        value: phoneNum,
      } as const

      const sendCodeResp = await sendCodeChangeAttribute(payload)

      if (typeof sendCodeResp === "undefined") return

      console.log(sendCodeResp)

      dispatch(tmpStoreAction.setItem("phone", phoneNum))
      navigate("Settings", {
        screen: "VerifyCodeForUpdate",
        params: { phone: phoneNum },
      })
    })()
  }

  const togglePopup = () => {
    setPopupVisible(false)
  }

  return (
    <GeneralScreenLayout>
      <View className="flex flex-col">
        <VerifyPhoneInput
          phone={phone}
          setPhone={setPhone}
          setIsValid={setIsValid}
        />

        <LatoText classname="text-gray-lighter text-[14px] px-2 mt-4">
          Changing your number changes the number for all the accounts
          associated with this phone number.
        </LatoText>
      </View>
      <FlatButton
        text={"SEND CODE"}
        onPress={handleSendCode}
        disabled={!isValid}
      />

      {/* TODO: extract popUp Modal component for shared use */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isPopupVisible}
        onRequestClose={togglePopup}
      >
        <TouchableWithoutFeedback>
          <View className="flex-1 justify-center items-center bg-black/70">
            <View className="w-[300px] flex justify-items-center bg-gray-darkest pt-12 rounded-[10px]">
              <LatoText classname="text-lg font-lato-bold text-white text-center pb-8">
                Sorry, can&apos;t update number
              </LatoText>

              <View className="w-full px-8 pb-8">
                <LatoText classname=" text-gray-lighter text-[16px] text-center">
                  The number you entered is already registered to an account.
                  Please enter another number to verify.
                </LatoText>
              </View>

              <TouchableOpacity
                className="py-4 border-t-[0.5px] border-white/20 "
                onPress={togglePopup}
              >
                <LatoText classname="text-center font-lato-bold">OK</LatoText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </GeneralScreenLayout>
  )
}

export default EditPhone
