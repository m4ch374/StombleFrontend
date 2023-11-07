// REFERENCE: SignUp3

import { Text, TextInput, View, Pressable, Platform } from "react-native"
import { useState } from "react"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MaterialIcons } from "@expo/vector-icons"
import FlatButton from "components/styled_components/FlatButton"
import { AuthStackList } from "types/Navigation"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import ProgressBar from "components/ProgressBar"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import InputBlueBg from "components/settings/InputBlueBg"
import { Type } from "types/variantStyle"
import SimplePopupAlert from "components/PopupAlert"

type Props = {
  navigation: NativeStackNavigationProp<AuthStackList, "SignUpDOB">
}

const SignUpDOB = ({ navigation }: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const dispatch = useAppDispatch()
  const dob = useAppSlector(state => state.tmpStore.birthday)
  const [dateofbirth, setDOB] = useState(dob)
  const currentStep = 3 // Set the current step for this page

  const [date, setDate] = useState<Date>(new Date())

  const confirmDate = (d: Date) => {
    const today = new Date()
    const threashold = today.getFullYear() - 13

    if (d.getFullYear() > threashold) {
      setDatePickerVisibility(false)
      setShowModal(true)
      return
    }

    setDOB(d.toISOString().split("T")[0])
    setDisabled(false)
    setDatePickerVisibility(false)
  }

  return (
    <GeneralScreenLayout paddingX="px-0" marginTop="mt-8" marginBottom="mb-0">
      <View className="flex-1 relative">
        <View className="flex-1 px-8 mb-20">
          <View className="mb-16">
            <ProgressBar currentStep={currentStep} />
          </View>

          <View className="flex-1">
            <InputBlueBg title="What is your birthday?" variant={Type.outlined}>
              <View className="flex-row pr-4">
                <TextInput
                  className="w-[95%] text-[16px] text-white"
                  editable={false}
                  selectTextOnFocus={false}
                  value={dateofbirth}
                  placeholder={
                    date.getDate().toString() +
                    "-" +
                    date.getMonth().toString() +
                    "-" +
                    date.getFullYear().toString()
                  }
                  placeholderTextColor="#ffffff"
                />

                <Pressable
                  onPress={() => setDatePickerVisibility(!isDatePickerVisible)}
                >
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={24}
                    color="white"
                  />
                </Pressable>
              </View>
            </InputBlueBg>
          </View>

          <FlatButton
            text="NEXT"
            disabled={disabled}
            onPress={() => {
              dispatch(tmpStoreAction.setItem("birthday", dateofbirth))
              navigation.navigate("SetUpPassword")
            }}
          />
        </View>

        {isDatePickerVisible && (
          <View className="w-[100%] flex-1 absolute bottom-0 bg-gray-darkest rounded-t-md  ">
            <Pressable
              onPress={() => {
                confirmDate(date)
                setDatePickerVisibility(false)
              }}
              className="flex justify-end py-[10px] pr-6"
            >
              <Text className="text-right text-[20px] text-[#326FCB]">
                Done
              </Text>
            </Pressable>
            <View className="justify-center items-center border-t-[1px] border-[#ffffff80]">
              <DateTimePicker
                value={date}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                mode="date"
                onChange={(_, selectedDate) => {
                  const currentDate = selectedDate || date
                  setDate(currentDate)
                }}
                textColor="#ffffff"
              />
            </View>
          </View>
        )}

        <SimplePopupAlert
          showModal={showModal}
          setShowModal={setShowModal}
          alertMsg={
            "To create a Stomble account, your age must be 13 years or over."
          }
        />
      </View>
    </GeneralScreenLayout>
  )
}
export default SignUpDOB
