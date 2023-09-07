// REFERENCE: PLACEHOLDER

import React, { useState } from "react"
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from "react-native"
import { useAppDispatch } from "redux/hooks"
import { tokenAction } from "redux/reducers/tokens.reducer"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import Fetcher from "utils/Fetcher"
import { TCloseAccount } from "types/endpoints"
import { accountEP } from "constants/Endpoint"

const Home: React.FC = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const [bId, setBId] = useState("")

  const handleFakeLogout = () => {
    ;(async () => {
      await AsyncStorage.setItem("token", "")
      dispatch(tokenAction.clearToken())

      navigation.navigate("Auth", { screen: "FirstLanding" })
    })()
  }

  const handleRemove = () => {
    ;(async () => {
      const resp = await Fetcher.init<TCloseAccount>(
        "DELETE",
        accountEP.CLOSE_ACCOUNT,
      )
        .withJsonPaylad({ businessId: bId })
        .withCurrentToken()
        .fetchData()

      if (typeof resp === "undefined") return

      handleFakeLogout()
    })()
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        className="flex justify-center items-center h-screen gap-5"
      >
        <Text className="text-4xl">Lorem Ipsum</Text>

        <TouchableOpacity
          onPress={handleFakeLogout}
          className="py-2 px-4 border-2 border-orange-600 rounded-md"
        >
          <Text className="text-2xl text-orange-600 font-Lato">
            Fake Log out
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRemove}
          className="py-2 px-4 border-2 border-red-600 rounded-md"
        >
          <Text className="text-2xl text-red-600 font-Lato">
            Remove account
          </Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Business Id (empty for delete user)"
          onChangeText={setBId}
          className="bg-slate-300 px-2 py-1 rounded-md"
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default Home
