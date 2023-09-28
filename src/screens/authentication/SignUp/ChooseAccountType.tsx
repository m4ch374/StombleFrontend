// REFERENCE: REGISTER-48

import { View, Pressable, TouchableOpacity } from "react-native"
import { useState } from "react"
import FlatButton from "components/styled_components/FlatButton"
import { useNavigation } from "@react-navigation/native"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { tokenAction } from "redux/reducers/tokens.reducer"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { signUp } from "utils/services/auth"
import ProgressBar from "components/ProgressBar"
import LatoText from "components/styled_components/LatoText"
import Disclaimer from "components/Disclaimer"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"

type TSelection = "" | "business" | "personal"

const ChooseAccountType = () => {
  const navigation = useNavigation()
  const tmp = useAppSlector(state => state.tmpStore)
  const dispatch = useAppDispatch()
  const [selected, setSelected] = useState<TSelection>("")

  const handleNextStep = () => {
    if (selected === "business") {
      navigation.navigate("Auth", { screen: "SignUpBusinessName" })
      return
    }

    ;(async () => {
      const payload = {
        phone: tmp.phone,
        password: tmp.password,
        businessName: "",
        isBusiness: false,
      }

      const resp = await signUp(payload)

      if (typeof resp === "undefined") return

      dispatch(tokenAction.setToken(resp.AccessToken))
      dispatch(tmpStoreAction.clearState())

      navigation.navigate("Auth", { screen: "FollowTopics" })
    })()
  }

  return (
    <GeneralScreenLayout marginTop="8">
      <View className="flex flex-col gap-8">
        <View className="mb-15">
          <ProgressBar
            totalSteps={selected === "business" ? 8 : 7}
            currentStep={7}
          />
        </View>
        <LatoText classname="text-7 font-lato-bold text-center mb-31">
          Choose your account type.
        </LatoText>

        <View className="flex items-center space-y-8">
          <View className="w-[300px] border pt-4 pb-8 pl-8 pr-4 rounded-md border-gray-mid">
            <View className="flex-row justify-between">
              <LatoText classname="font-lato-bold mb-4">Business</LatoText>
              <Pressable
                onPress={() => setSelected("business")}
                className={`
              w-[16px]
              h-[16px]
              m-2
              flex
              items-center
              justify-center
              rounded-full
              border aspect-square
              ${selected === "business" ? "border-white" : "border-white/50"}
            `}
              >
                {selected === "business" && (
                  <View className="w-[60%] h-[60%] bg-secondary rounded-full" />
                )}
              </Pressable>
            </View>
            <LatoText classname="mb-4 text-7 text-gray-lightest justify-start">
              Best for local businesses, brands, organizations,startups and
              influencers.
            </LatoText>
            <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
              <LatoText classname="text-secondary font-lato-bold">
                Check out the benefits
              </LatoText>
            </TouchableOpacity>
          </View>

          <View className="w-[300px] border pt-4 pb-8 pl-8 pr-4 rounded-md border-gray-mid">
            <View className="flex-row justify-between">
              <LatoText classname="font-lato-bold mb-4">Personal</LatoText>
              <Pressable
                onPress={() => setSelected("personal")}
                className={`
              w-[16px]
              h-[16px]
              m-2
              flex
              items-center
              justify-center
              rounded-full
              border aspect-square
              ${selected === "personal" ? "border-white" : "border-white/50"}
            `}
              >
                {selected === "personal" && (
                  <View className="w-[60%] h-[60%] bg-secondary rounded-full" />
                )}
              </Pressable>
            </View>
            <LatoText classname="mb-4 text-7 text-gray-lightest justify-start">
              Best for exploring new trends in business and following your
              favourite accounts.
            </LatoText>
          </View>
        </View>
      </View>

      <View className="border-[1px] border-solid border-navbar w-full">
        {selected === "personal" && <Disclaimer />}

        <FlatButton
          text={selected === "business" ? "next" : "sign up"}
          disabled={selected === ""}
          onPress={handleNextStep}
        />
      </View>
    </GeneralScreenLayout>
  )
}
export default ChooseAccountType
