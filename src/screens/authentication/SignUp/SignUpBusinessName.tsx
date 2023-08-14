// REFERENCE: REGISTER-58

// Copied from shadow realm

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import BackgroundColour from "../../../components/styled_components/BackgroundColour"
import FlatButton from "../../../components/styled_components/FlatButton"
import { useNavigation } from "@react-navigation/native"
import Fetcher from "../../../utils/Fetcher"
import { TSignUp } from "../../../types/endpoints"
import { useAppDispatch, useAppSlector } from "../../../redux/hooks"
import { tmpStoreAction } from "../../../redux/reducers/tmpStore.reducer"
import { tokenAction } from "../../../redux/reducers/tokens.reducer"

const SignupBusinessName = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const tmp = useAppSlector(state => state.tmpStore)

  const [businessName, setBusinessName] = useState("")

  const handlePress = () => {
    ;(async () => {
      const resp = await Fetcher.init<TSignUp>("POST", "/sign-up")
        .withJsonPaylad({
          businessName,
          isBusiness: true,
          password: tmp.password,
          phone: tmp.phone,
        })
        .fetchData()

      if (typeof resp === "undefined") return

      dispatch(tmpStoreAction.clearState())
      dispatch(tokenAction.setToken(resp.AccessToken))
      navigation.navigate("LoginRoot", { screen: "Home" })
    })()
  }

  return (
    <BackgroundColour>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          className="flex-1 p-[16px]"
          style={{ flexDirection: "column", height: "100%" }}
        >
          <View className="flex-1">
            <View className="mb-2">
              <Text
                className="text-white text-sm"
                style={{ fontFamily: "Lato-400" }}
              >
                What&apos;s your business name?
              </Text>
            </View>
            <View className="h-12 bg-transparent rounded-md flex-row items-center justify-between px-3 border border-solid border-white mt-3">
              <TextInput
                className="text-white py-auto text-base leading-[16px] w-[280px] h-5"
                style={{ fontFamily: "Lato-700" }}
                placeholderTextColor="#ABABAB"
                onChangeText={setBusinessName}
              />
            </View>
            <View className="mb-2">
              <Text
                className="text-white text-sm mt-3"
                style={{ fontFamily: "Lato-400" }}
              >
                This name will be displayed as your profile name.
              </Text>
            </View>
          </View>
          <View className="flex-2 justify-end mb-10">
            <FlatButton
              text="SIGN UP"
              disabled={businessName === ""}
              onPress={handlePress}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BackgroundColour>
  )
}
export default SignupBusinessName