// REFERENCE: SignUp3

// From shadow realm
// TODO: Lint

import {
  Text,
  TextInput,
  View,
  Pressable,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from "react-native"
import { useEffect, useState } from "react"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MaterialIcons } from "@expo/vector-icons"
import FlatButton from "components/styled_components/FlatButton"
import { AuthStackList } from "types/Navigation"

// Issues with the library itself
// eslint-disable-next-line import/no-named-as-default
import DateTimePicker from "@react-native-community/datetimepicker"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import ProgressBar from "components/ProgressBar"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import InputBlueBg from "components/settings/InputBlueBg"
import { Type } from "types/variantStyle"

type Props = {
  navigation: NativeStackNavigationProp<AuthStackList, "SignUpDOB">
}

const SignUpDOB = ({ navigation }: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [disabled, setDisabled] = useState(true)

  // We are using whatever name saved in our redux storage as default
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

  useEffect(() => {
    console.log(isDatePickerVisible)
  }, [isDatePickerVisible])

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

        {/* TODO: need UI refactor to this popup component*/}
        <Modal animationType="fade" visible={showModal} transparent={true}>
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View className=" bg-black/30 w-full h-full flex justify-center items-center">
              <View className="z-100 bg-gray-darkest rounded-md flex items-center justify-center w-[90%]">
                <View className="p-5 flex gap-2">
                  <Text className="text-white text-xl text-center font-lato-bold">
                    Sorry can&apos;t create an account
                  </Text>
                  <Text className="text-gray-lighter text-lg text-center font-lato-bold">
                    To create a Stomble account your minimum age must be 13
                    years or over
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setShowModal(false)
                  }}
                  className="py-2 border-t border-white w-full flex items-center justify-center"
                >
                  <Text className="text-white text-xl font-lato-bold">OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </GeneralScreenLayout>
  )
}
export default SignUpDOB
