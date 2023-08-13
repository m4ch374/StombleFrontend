// REFERENCE: REGISTER-48

import { View, Text, Pressable } from "react-native"
import { useState } from "react"
import FlatButton from "../../../components/styled_components/FlatButton"
import { Link, useNavigation } from "@react-navigation/native"
import BackgroundColour from "../../../components/styled_components/BackgroundColour"
import Fetcher from "../../../utils/Fetcher"
import { TSignUp } from "../../../types/endpoints"
import { useAppDispatch, useAppSlector } from "../../../redux/hooks"
import { tokenAction } from "../../../redux/reducers/tokens.reducer"
import { tmpStoreAction } from "../../../redux/reducers/tmpStore.reducer"

type TSelection = "" | "business" | "personal"

const ChooseAccountType = () => {
  const navigation = useNavigation()
  const tmp = useAppSlector(state => state.tmpStore)
  const dispatch = useAppDispatch()

  const [selected, setSelected] = useState<TSelection>("") // ugly hack but works

  const handlePress = () => {
    if (selected === "business") {
      navigation.navigate("Auth", { screen: "SignUpBusinessName" })
      return
    }

    ;(async () => {
      const resp = await Fetcher.init<TSignUp>("POST", "/sign-up")
        .withJsonPaylad({
          phone: tmp.phone,
          password: tmp.password,
          businessName: "",
          isBusiness: false,
        })
        .fetchData()

      if (typeof resp === "undefined") return

      dispatch(tokenAction.setToken(resp.AccessToken))
      dispatch(tmpStoreAction.clearState())
      navigation.navigate("LoginRoot", { screen: "Home" })
    })()
  }

  return (
    <BackgroundColour>
      <View className="flex-1 p-[16px] flex-col h-full gap-8">
        <Text
          className="text-white text-[16px]"
          style={{ fontFamily: "Lato-700" }}
        >
          Choose Account type
        </Text>

        <Pressable
          onPress={() => setSelected("business")}
          className={`border p-3 rounded-md ${
            selected === "business" ? "border-white" : "border-white/50"
          }`}
        >
          <View className="flex-row justify-between">
            <Text
              className="text-[18px] text-white"
              style={{ fontFamily: "Lato-700" }}
            >
              Business
            </Text>
            <View
              className={`
              flex
              items-center
              justify-center
              rounded-full
              border aspect-square
              ${selected === "business" ? "border-white" : "border-white/50"}
            `}
            >
              {selected === "business" && (
                <View className="w-[60%] h-[60%] bg-white rounded-full" />
              )}
            </View>
          </View>
          <Text
            className="text-[13px] text-[#C1C1C1] justify-start mt-[10px]"
            style={{ fontFamily: "Lato-700" }}
          >
            Best for local businesses, brands, organizations,startups and
            influencers.
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setSelected("personal")}
          className={`border p-3 rounded-md ${
            selected === "personal" ? "border-white" : "border-white/50"
          }`}
        >
          <View className="flex-row justify-between">
            <Text
              className="text-[18px] text-white"
              style={{ fontFamily: "Lato-700" }}
            >
              Personal
            </Text>
            <View
              className={`
              flex
              items-center
              justify-center
              rounded-full
              border aspect-square
              ${selected === "personal" ? "border-white" : "border-white/50"}
            `}
            >
              {selected === "personal" && (
                <View className="w-[60%] h-[60%] bg-white rounded-full" />
              )}
            </View>
          </View>
          <Text
            className="text-[13px] text-[#C1C1C1] justify-start mt-[10px]"
            style={{ fontFamily: "Lato-700" }}
          >
            Best for exploring new trends in business and following your
            favourite accounts.
          </Text>
        </Pressable>
      </View>

      <View className="mb-16 mx-4">
        <View className="flex-row justify-center items-center mb-[16px]">
          <Text className="text-[#C1C1C1] text-[10px]">
            By continuing you agree to the
          </Text>

          <View className="px-[4px]">
            <Text className="text-[#326FCB] text-[10px]">
              <Link to={"TermsAndPrivacy"}>Terms of Service</Link>
            </Text>
          </View>

          <Text className="text-[#C1C1C1] text-[10px]">and</Text>

          <View className="pl-[4px]">
            <Text className="text-[#326FCB] text-[10px]">
              <Link to={"TermsAndPrivacy"}>Privacy Policies</Link>
            </Text>
          </View>
        </View>

        <FlatButton
          text="SIGN UP"
          disabled={selected === ""}
          onPress={handlePress}
        />
      </View>
    </BackgroundColour>
  )
}
export default ChooseAccountType
