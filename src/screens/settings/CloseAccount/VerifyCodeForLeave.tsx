// REFERENCE: Setting - Personal - Close Account

//----------------------------------------------------------------
// Waiting for new design
//----------------------------------------------------------------
import { View, Text, KeyboardAvoidingView, Platform } from "react-native"
import { useState } from "react"
import FlatButton from "components/styled_components/FlatButton"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { VerifyCodeField } from "components/VerifyCodeField"
import SettingsScreenLayout from "components/settings/SettingsScreenLayout"
import Fetcher from "utils/Fetcher"
import { TCloseAccount } from "types/endpoints"
import { accountEP } from "constants/Endpoint"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { tokenAction } from "redux/reducers/tokens.reducer"

const VerifyCodeForLeave = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const tmp = useAppSlector(state => state.tmpStore)
  const [disable, setDisabled] = useState(true)
  const [value, setValue] = useState("")

  // Alert: close account needs some changes
  const handleCloseAccount = () => {
    ;(async () => {
      const resp = await Fetcher.init<TCloseAccount>(
        "DELETE",
        accountEP.CLOSE_ACCOUNT,
      )
        .withJsonPaylad({ businessId: tmp.userId })
        .withCurrentToken()
        .fetchData()

      //the user can't be removed if it has any business. In that case the users have to execute close-account sending the businessId
      if (typeof resp === "undefined") {
        alert("something went wrong")
      }

      // fake logout
      ;(async () => {
        await AsyncStorage.setItem("token", "")
        dispatch(tokenAction.clearToken())

        navigation.navigate("Auth", { screen: "FirstLanding" })
      })()
    })()
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <SettingsScreenLayout>
        <View className="flex-1 items-center">
          <Text className="text-white font-lato text-base mb-4 text-center">
            Complete the SMS verification to confirm that this account belongs
            to you. Tapping “Close Account” will delete account {tmp.fullName}.
            Enter the 6 digit code we send to {tmp.phone}.
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
      </SettingsScreenLayout>
    </KeyboardAvoidingView>
  )
}

export default VerifyCodeForLeave
