// REFERENCE: REGISTER-54

import { Text, View } from "react-native"
import React from "react"
import FlatButton from "components/styled_components/FlatButton"
import { SelectList } from "react-native-dropdown-select-list"
import { FontAwesome } from "@expo/vector-icons"
import BackgroundColour from "components/styled_components/BackgroundColour"
import { useAppDispatch } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { useNavigation } from "@react-navigation/native"
import ProgressBar from "components/ProgressBar"

const SignUpGender = () => {
  const { navigate } = useNavigation()
  const [selected, setSelected] = React.useState("")
  const currentStep = 4 // Set the current step for this page

  // We are using whatever dob saved in our redux storage as default
  const dispatch = useAppDispatch()

  const data = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
    { key: "3", value: "Others" },
    { key: "4", value: "Prefer not to say" },
  ]

  const getValueFromKey = (key: string) => {
    return data.filter(d => d.key === key)[0].value.toLocaleLowerCase()
  }
  return (
    <BackgroundColour>
      <View
        className="flex-1 p-[16px]"
        style={{ flexDirection: "column", height: "100%" }}
      >
        <View className="flex-1">
          <View className="flex-1 px-[16px] mt-[34px]">
            <View>
              <ProgressBar currentStep={currentStep} />
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
                What is your gender?
              </Text>
            </View>

            <SelectList
              setSelected={setSelected}
              data={data}
              arrowicon={
                <FontAwesome name="chevron-down" size={12} color={"white"} />
              }
              searchicon={
                <FontAwesome name="search" size={12} color={"white"} />
              }
              search={false}
              placeholder="Select Gender"
              inputStyles={{ color: "white" }}
              boxStyles={{ borderColor: "#808080" }}
              dropdownStyles={{ borderColor: "white" }}
              dropdownTextStyles={{ color: "white" }}
            />

            <View className="mt-[10px] mb-[16px]">
              <Text
                className="text-[14px] text-[#C1C1C1]"
                style={{ fontFamily: "Lato-400" }}
              >
                This will help us tailor your experience
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-2 justify-end mb-10">
          <FlatButton
            text="PROCEED"
            disabled={selected === ""}
            onPress={() => {
              dispatch(
                tmpStoreAction.setState(state => {
                  state.gender = getValueFromKey(selected)
                  state.verifyWithPassword = false
                  return state
                }),
              )
              navigate("Auth", { screen: "SetUpPassword" })
            }}
          />
        </View>
      </View>
    </BackgroundColour>
  )
}

export default SignUpGender
