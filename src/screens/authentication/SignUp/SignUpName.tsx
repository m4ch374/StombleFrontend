// REFERENCE: REGISTER-43

import { TextInput, Text, View } from "react-native"
import BackgroundColour from "components/styled_components/BackgroundColour"
import FlatButton from "components/styled_components/FlatButton"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { useState } from "react"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { useNavigation } from "@react-navigation/native"

// TODO: Lint
/* eslint-disable */
const SignUpName = () => {
  const { navigate } = useNavigation()
  const dispatch = useAppDispatch()

  // We are using whatever name saved in our redux storage as default
  const name = useAppSlector(state => state.tmpStore.fullName)

  const [fullname, setFullname] = useState(name)

  return (
    <BackgroundColour>
      <View className="flex-1 px-[16px] mt-[34px]">
        <View className=" h-[8px] w-FULL bg-white rounded-[5px]">
          <View className="h-[8px] w-1/3 bg-[#0B52BC] rounded-[5px] ">
            <View className="h-full w-1 bg-black absolute right-0 top-0 straight-r-[5px]"></View>
          </View>
        </View>

        <View className="mt-[34px]">
          <Text
            className="text-[16px] text-white"
            style={{ fontFamily: "Lato-700" }}
          >
            Create your Stomble account
          </Text>
        </View>

        <View className="mt-[24px] mb-[16px]">
          <Text
            className="text-[14px] text-[#ffffff80]"
            style={{ fontFamily: "Lato-400" }}
          >
            What's your Full Name?
          </Text>
        </View>

        <View className="flex-1 justify-between">
          <View className="flex h-[48px] w-full pl-[12px] justify-center rounded-[5px] border-[1px] border-gray-500 ">
            <TextInput
              className="text-[16px] text-white "
              onChangeText={setFullname}
              value={fullname}
              placeholder={fullname}
              placeholderTextColor="#ffffff80"
            />
          </View>

          <View className="flex-2 justify-end mb-10">
            <FlatButton
              text="NEXT"
              disabled={fullname === "" ? true : false}
              onPress={() => {
                dispatch(
                  tmpStoreAction.setItem("fullName", fullname),
                )
                navigate("Auth", { screen: "SignUpDOB" })
              }}
            />
          </View>
        </View>
      </View>
    </BackgroundColour>
  )
}

export default SignUpName
