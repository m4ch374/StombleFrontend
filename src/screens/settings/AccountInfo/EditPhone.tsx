// REFERENCE: Setting - Personal - Edit Phone
import SettingsScreenLayout from "components/settings/SettingsScreenLayout"
import { View } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import PhoneNumberInput from "components/PhoneNumberInput"
import { useEffect, useState } from "react"
import FlatButton from "components/styled_components/FlatButton"
import { useNavigation } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { useAppSlector } from "redux/hooks"
import LatoText from "components/styled_components/LatoText"
import CustomColor from "constants/Colors"
import { checkNumber } from "utils/services/auth"
import { sendCodeChangeAttribute } from "utils/services/accountInfo"

const EditPhone = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const [isValid, setIsValid] = useState(true)
  const [disabled, setDisabled] = useState(true)
  const [existed, setExisted] = useState(false)
  const [phone, setPhone] = useState({
    number: "",
    countryCode: "+61",
  })

  useEffect(() => {
    setDisabled(!isValid)
  }, [isValid])

  const handleSendCode = () => {
    ;(async () => {
      // endpoint: /check-number
      const checkExistResp = await checkNumber({
        phone: phone.countryCode + phone.number,
      })

      if (typeof checkExistResp === "undefined") return

      // CHECK ON THIS LATER!!!
      if (checkExistResp.exists) {
        setExisted(checkExistResp.exists)
        return
      } else {
        setExisted(checkExistResp.exists)
      }

      // endpoint: /send-code-change-attribute - phone_number
      const payload = {
        attribute: "phone_number",
        value: phone.countryCode + phone.number,
        userId: tmpUser.userId,
      } as const

      const sendCodeResp = await sendCodeChangeAttribute(payload)

      if (typeof sendCodeResp === "undefined") return

      // Should we check - If new phone number is not exist in db, allow to send code to the phone number to update phone number
      dispatch(
        tmpStoreAction.setItem({
          key: "phone",
          item: phone.countryCode + phone.number,
        }),
      )
      navigate("Settings", {
        screen: "VerifyCodeForUpdate",
        params: { phone: phone.countryCode + phone.number },
      })
    })()
  }

  return (
    <SettingsScreenLayout>
      <View>
        <View>
          <LatoText classname="text-gray-lightest text-sm mb-4">
            Mobile Number
          </LatoText>
          <PhoneNumberInput
            setPhone={setPhone}
            isValid={isValid}
            setIsValid={setIsValid}
          />
        </View>

        <LatoText classname="text-gray-darkest text-[14px]">
          Changing your number changes the number for all the accounts
          associated with this phone number.
        </LatoText>
        {/* TODO: extract error message out */}
        {existed && !isValid && (
          <View className="flex flex-row items-center">
            <AntDesign
              name="exclamationcircleo"
              size={24}
              color={CustomColor.util.error}
            />
            <LatoText classname="text-util-error mx-2 text-[14px] my-6">
              The number you entered is already registered to an account. Please
              enter another number to verify.
            </LatoText>
          </View>
        )}
      </View>
      <FlatButton
        text={"SEND CODE"}
        onPress={handleSendCode}
        disabled={disabled}
      />
    </SettingsScreenLayout>
  )
}

export default EditPhone
