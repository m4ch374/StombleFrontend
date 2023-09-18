// REFERENCE: Setting - Personal - Edit Phone
import { View } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useState } from "react"
import FlatButton from "components/styled_components/FlatButton"
import { useNavigation } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { useAppSlector } from "redux/hooks"
import LatoText from "components/styled_components/LatoText"
import CustomColor from "constants/Colors"
import { sendCodeChangeAttribute } from "utils/services/accountInfo"
import VerifyPhone from "components/VerifyPhone"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"

const EditPhone = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const [isValid, setIsValid] = useState(false)
  const [isExists, setIsExists] = useState(true)
  const [phone, setPhone] = useState("")

  const handleSendCode = () => {
    ;(async () => {
      // endpoint: /send-code-change-attribute - phone_number
      const phoneNum = "+61" + phone
      const payload = {
        attribute: "phone_number",
        value: phoneNum,
        userId: tmpUser.userId,
      } as const

      const sendCodeResp = await sendCodeChangeAttribute(payload)

      if (typeof sendCodeResp === "undefined") return

      dispatch(tmpStoreAction.setItem("phone", phoneNum))
      navigate("Settings", {
        screen: "VerifyCodeForUpdate",
        params: { phone: phoneNum },
      })
    })()
  }

  return (
    <GeneralScreenLayout>
      <View className="flex flex-col">
        <VerifyPhone
          phone={phone}
          setPhone={setPhone}
          setIsValid={setIsValid}
          setIsExists={setIsExists}
        />

        {/* TODO: extract error message out */}
        {isExists && isValid && (
          <View className="flex flex-row items-center pr-8 ">
            <AntDesign
              name="exclamationcircleo"
              size={24}
              color={CustomColor.util.error}
            />
            <LatoText classname="text-util-error mx-4 text-[14px] my-6">
              The number you entered is already registered to an account. Please
              enter another number to verify.
            </LatoText>
          </View>
        )}

        <LatoText classname="text-gray-lighter text-[14px] px-2">
          Changing your number changes the number for all the accounts
          associated with this phone number.
        </LatoText>
      </View>
      <FlatButton
        text={"SEND CODE"}
        onPress={handleSendCode}
        disabled={!isValid || isExists}
      />
    </GeneralScreenLayout>
  )
}

export default EditPhone
