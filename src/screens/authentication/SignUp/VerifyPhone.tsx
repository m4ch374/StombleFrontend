// REFERENCE: REGISTER-47

// Code copied from shadow-realm

import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import React, { useState } from "react"
import BackgroundColour from "components/styled_components/BackgroundColour"
import { Link, useNavigation } from "@react-navigation/native"
import FlatButton from "components/styled_components/FlatButton"
import PhoneNumberInput from "components/PhoneNumberInput"
import { useAppDispatch } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import Fetcher from "utils/Fetcher"
import { TCheckNum } from "types/endpoints"
import { authEP } from "constants/Endpoint"

// Breaking the rules a bit here again
const Divider: React.FC = () => {
  return <View className="border-t border-gray-300/10" />
}

const VerifyPhone: React.FC = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const [isValid, setIsValid] = useState(true)
  const [isPopupVisible, setPopupVisible] = useState(false)
  const [phone, setPhone] = useState({
    number: "",
    countryCode: "+61",
  })

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible)
  }

  const handleBtnPress = () => {
    ;(async () => {
      const resp = await Fetcher.init<TCheckNum>("POST", authEP.CHECK_NUMBER)
        .withJsonPaylad({ phone: phone.countryCode + phone.number })
        .fetchData()

      // Ebic leetcode syntax right here
      if (typeof resp === "undefined") return

      if (resp.exists) {
        togglePopup()
        return
      }

      dispatch(
        tmpStoreAction.setItem({
          key: "phone",
          item: phone.countryCode + phone.number,
        }),
      )
      navigation.navigate("Auth", { screen: "SignUpName" })
    })()
  }

  return (
    <BackgroundColour>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 gap-6 px-4">
          <Text
            className="text-white text-[16px]"
            style={{ fontFamily: "Lato-700" }}
          >
            Verify your mobile number to get started
          </Text>

          <View className="flex-1">
            <Text className="text-[#ffffff80] text-[14px] leading-[22px] text-start mb-[8px]">
              Mobile Number
            </Text>
            <PhoneNumberInput
              setPhone={setPhone}
              isValid={isValid}
              setIsValid={setIsValid}
            />
          </View>

          <View className="flex-2 justify-end">
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

            <View className=" mb-[16px] ">
              <FlatButton
                text="CONTINUE"
                disabled={phone.number === "" || !isValid}
                onPress={handleBtnPress}
              />
            </View>

            <View className="flex-row justify-center items-center align-middle">
              <Text
                className="text-[16px] text-white mb-[40px]"
                style={{ fontFamily: "Lato-700" }}
              >
                Already have an account?
              </Text>
              <View className="ml-[2px] mb-[40px]">
                <Link to={"/ChooseAccountType"}>
                  <Text className="text-[#326FCB] font-semibold"> Log In</Text>
                </Link>
              </View>
            </View>
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={isPopupVisible}
            onRequestClose={togglePopup}
          >
            <TouchableWithoutFeedback onPress={() => togglePopup()}>
              <View className="flex-1 justify-center items-center bg-black/30">
                <View className="bg-[#2c2c2c] mx-2 rounded-md">
                  <View className="p-4 flex gap-2">
                    <Text
                      className="text-xl text-white text-center"
                      style={{ fontFamily: "Lato-700" }}
                    >
                      This mobile number matches your existing account!
                    </Text>
                    <Text
                      className="text-md text-white text-center"
                      style={{ fontFamily: "Lato-700" }}
                    >
                      You already have an account with this contact info. Do you
                      want to create another account with the same mobile
                      number?
                    </Text>
                  </View>

                  <Divider />

                  <TouchableOpacity className="py-3" onPress={togglePopup}>
                    <Text
                      className="text-center text-blue-500 text-[16px]"
                      style={{ fontFamily: "Lato-700" }}
                    >
                      Yes, use the same mobile number
                    </Text>
                  </TouchableOpacity>

                  <Divider />

                  <TouchableOpacity className="py-3" onPress={togglePopup}>
                    <Text
                      className="text-center text-[16px] text-white"
                      style={{ fontFamily: "Lato-700" }}
                    >
                      No, use a different number
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </BackgroundColour>
  )
}

export default VerifyPhone
