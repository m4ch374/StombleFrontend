// REFERENCE: REGISTER-46

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
import BackgroundColour from "components/styled_components/BackgroundColour"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"

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
    <BackgroundColour>
      <View className="flex-1 px-[16px] mt-[34px]">
        <View className=" h-[8px] w-FULL bg-white rounded-[5px]">
          <View className="h-[8px] w-2/3 bg-[#0B52BC] rounded-[5px] ">
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
            When is your date of birth?
          </Text>
        </View>
        <View className="flex-1 p-[16px] flex-col h-full">
          <Pressable
            onPress={showDatePicker}
            className="flex-row justify-between items-center px-[8px] h-[48px] w-full rounded-[5px] border-[#ffffff70] border-[1px] "
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
          <View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </View>
        <View className="flex-2 justify-end mb-10">
          <FlatButton
            text="NEXT"
            disabled={dateofbirth === "" ? true : false}
            onPress={() => {
              dispatch(
                tmpStoreAction.setItem({ key: "birthday", item: dateofbirth }),
              )
              navigation.navigate("SignUpGender")
            }}
          />
        </View>

        <Modal animationType="fade" visible={showModal} transparent={true}>
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View className="bg-black/30 w-full h-full flex justify-center items-center">
              <View className="bg-[#2c2c2c] rounded-md flex items-center justify-center w-[90%]">
                <View className="p-5 flex gap-2">
                  <Text
                    className="text-white text-xl text-center"
                    style={{ fontFamily: "Lato-700" }}
                  >
                    Sorry can&apos;t create an account
                  </Text>
                  <Text
                    className="text-gray-300/60 text-lg text-center"
                    style={{ fontFamily: "Lato-700" }}
                  >
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
                  <Text
                    className="text-white text-xl"
                    style={{ fontFamily: "Lato-700" }}
                  >
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </BackgroundColour>
  )
}
export default SignUpDOB
