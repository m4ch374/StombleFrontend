// REFERENCE: Setting - Personal - Close Account

import { View, Text, KeyboardAvoidingView, Platform } from "react-native"
import { useState } from "react"
import FlatButton from "components/styled_components/FlatButton"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { VerifyCodeField } from "components/VerifyCodeField"
import Fetcher from "utils/Fetcher"
import { TCloseAccount } from "types/endpoints"
import { accountEP } from "constants/Endpoint"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { tokenAction } from "redux/reducers/tokens.reducer"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"

const VerifyCodeForLeave = () => {
  const navigate = useNavigation()
  const dispatch = useAppDispatch()
  const tmp = useAppSlector(state => state.tmpStore)
  const [disable, setDisabled] = useState(true)
  const [value, setValue] = useState("")

  // TODO: endpoint for sms to close account is ready. Need to rewrite this function
  const handleCloseAccount = () => {
    ;(async () => {
      const resp = await Fetcher.init<TCloseAccount>(
        "DELETE",
        accountEP.CLOSE_ACCOUNT,
      )
        .withJsonPaylad({})
        .withCurrentToken()
        .fetchData()

      //the user can't be removed if it has any business. In that case the users have to execute close-account sending the businessId
      if (typeof resp === "undefined") return

      await AsyncStorage.setItem("token", "")
      dispatch(tokenAction.clearToken())

      navigate.reset({
        index: 0,
        routes: [{ name: "Auth", params: { screen: "FirstLanding" } }],
      })
    })()
  }

  return (
    <GeneralScreenLayout>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <View className="flex-1 items-center">
          <Text className="text-white font-lato text-7 mb-4 text-center">
            Complete the SMS verification to confirm that this account belongs
            to you. Tapping “Close Account” will delete account{" "}
            <Text className="text-white text-7 font-lato-bold">
              {tmp.fullName}
            </Text>{" "}
            . Enter the 6 digit code we send to {tmp.phone}.
          </Text>

          <View className="p-12 flex justify-between h-full">
            <VerifyCodeField
              value={value}
              setValue={setValue}
              setDisabled={setDisabled}
            />
          </View>
        </View>

        <FlatButton
          text={"CLOSE ACCOUNT"}
          onPress={handleCloseAccount}
          disabled={disable}
          bgColor="bg-red-500"
        />
      </KeyboardAvoidingView>
    </GeneralScreenLayout>
  )
}

export default VerifyCodeForLeave
