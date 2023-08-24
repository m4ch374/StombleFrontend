// REFERENCE: Setting - Personal - Edit Phone
import InputBlueBg from "components/InputBlueBg"
import SettingsScreenLayout from "components/styled_components/SettingsScreenLayout"
import { View, Text } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import PhoneNumberInput from "components/PhoneNumberInput"
import { useEffect, useState } from "react"
import FlatButton from "components/styled_components/FlatButton"
import Fetcher from "utils/Fetcher"
import { TCheckNum, TSendCodeChangeAttribute } from "types/endpoints"
import { useNavigation } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { accountEP, authEP } from "constants/Endpoint"
import { useAppSlector } from "redux/hooks"

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
    // To check if the phone number is already registered
    ;(async () => {
      const checkExistResp = await Fetcher.init<TCheckNum>(
        "POST",
        authEP.CHECK_NUMBER,
      )
        .withJsonPaylad({ phone: phone.countryCode + phone.number })
        .fetchData()

      if (typeof checkExistResp === "undefined") return

      // CHECK ON THIS LATER!!!
      if (checkExistResp.exists) {
        setExisted(checkExistResp.exists)
        return
      } else {
        setExisted(checkExistResp.exists)
      }

      // endpoint: send code change attribute - phone_number
      const sendCodeResp = await Fetcher.init<TSendCodeChangeAttribute>(
        "POST",
        accountEP.SEND_CODE_CHANGE_ATTRIBUTE,
      )
        .withJsonPaylad({
          attribute: "phone_number",
          value: phone.countryCode + phone.number,
          userId: tmpUser.userId,
        })
        .withCurrentToken()
        .fetchData()

      if (typeof sendCodeResp === "undefined") return

      //If new phone number is not exist in db, allow to send code to the phone number to update phone number
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
        <InputBlueBg title="Mobile Number">
          <View className=" top-[18px] right-4">
            <PhoneNumberInput
              setPhone={setPhone}
              isValid={isValid}
              setIsValid={setIsValid}
              noBorder={true}
            />
          </View>
        </InputBlueBg>

        <Text className="text-textTert">
          Changing your number changes the number for all the accounts
          associated with this phone number.
        </Text>
        {existed && (
          <View className="flex flex-row items-center">
            <AntDesign name="exclamationcircleo" size={24} color="#F4222F" />
            <Text className="text-error mx-2">
              The number you entered is already registered to an account. Please
              enter another number to verify.
            </Text>
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
