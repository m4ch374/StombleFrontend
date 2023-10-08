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
} from "react-native"
import { useState } from "react"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MaterialIcons } from "@expo/vector-icons"
import FlatButton from "components/styled_components/FlatButton"
import { AuthStackList } from "types/Navigation"

// Issues with the library itself
// eslint-disable-next-line import/no-named-as-default
import DateTimePickerModal from "react-native-modal-datetime-picker"
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

  // We are using whatever name saved in our redux storage as default
  const dispatch = useAppDispatch()
  const dob = useAppSlector(state => state.tmpStore.birthday)
  const [dateofbirth, setDOB] = useState(dob)
  const currentStep = 3 // Set the current step for this page

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: Date) => {
    const selected = new Date(date)
    const today = new Date()
    const threashold = new Date(
      today.getFullYear() - 13,
      today.getMonth(),
      today.getDate(),
    )

    if (selected > threashold) {
      hideDatePicker()
      setShowModal(true)
      return
    }

    setDOB(selected.toISOString().split("T")[0])

    hideDatePicker()
  }

  return (
    <GeneralScreenLayout marginTop="mt-8">
      <View className="flex-1">
        <View className="mb-16">
          <ProgressBar currentStep={currentStep} />
        </View>

        <View className="flex-1">
          <InputBlueBg title="What is your full name?" variant={Type.outlined}>
            <Pressable
              onPress={showDatePicker}
              className="flex-row justify-between items-center w-full h-full"
            >
              <TextInput
                className="text-[16px] text-white"
                editable={false}
                selectTextOnFocus={false}
                value={dateofbirth}
                placeholder={"1/1/2023"}
                placeholderTextColor="#ffffff"
              />
              <View>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="white"
                />
              </View>
            </Pressable>
          </InputBlueBg>

          <View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </View>

        <FlatButton
          text="NEXT"
          disabled={dateofbirth === "" ? true : false}
          onPress={() => {
            dispatch(tmpStoreAction.setItem("birthday", dateofbirth))
            navigation.navigate("SetUpPassword")
          }}
        />

        {/* TODO: need UI refactor to this popup component*/}
        <Modal animationType="fade" visible={showModal} transparent={true}>
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View className="bg-black/30 w-full h-full flex justify-center items-center">
              <View className="bg-[#2c2c2c] rounded-md flex items-center justify-center w-[90%]">
                <View className="p-5 flex gap-2">
                  <Text className="text-white text-xl text-center font-lato-bold">
                    Sorry can&apos;t create an account
                  </Text>
                  <Text className="text-gray-300/60 text-lg text-center font-lato-bold">
                    To create a Stomble account your minimum age must be 13
                    years or over
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setShowModal(false)
                  }}
                  className="py-2 border-t border-gray-300/10 w-full flex items-center justify-center"
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
