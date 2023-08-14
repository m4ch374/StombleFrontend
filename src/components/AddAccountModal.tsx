import { Text, View, Pressable } from "react-native"
import React, { useState } from "react"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AuthStackList } from "types/Navigation"

type Props = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  navigation: NativeStackNavigationProp<AuthStackList, "LoginWithAccount">
}

// TODO: ask for clarification
const AddAccountModal: React.FC<Props> = ({ setModalVisible, navigation }) => {
  const [press, setPress] = useState<string>("Log into existing account")

  return (
    <Pressable
      className="w-screen h-screen fixed top-0 left-0 flex justify-end z-50"
      onPress={() => setModalVisible(false)}
    >
      <Pressable
        className="w-full bg-[#1C1C1E] px-[16px] pt-[8px] pb-[40px] flex justify-center items-center rounded-t-[30px]"
        onPress={e => e.stopPropagation()}
      >
        <View className="h-[3px] w-[48px] bg-[#ABABAB] rounded-[5px] mb-[21px]"></View>
        <Text
          className="text-white text-center text-[16px] mb-[32px]"
          style={{ fontFamily: "Lato-700" }}
        >
          Add Account
        </Text>

        <Pressable
          onPress={() => setPress("Log into existing account")}
          onLongPress={() => {
            navigation.navigate("LoginWithAccount")
            setModalVisible(false)
          }}
          className="h-[48px] w-full rounded-[5px] justify-center items-center"
          style={
            press === "Log into existing account" && {
              backgroundColor: "#0B52BC",
            }
          }
        >
          <Text className="text-center text-white text-[17px]">
            Log Into Existing Account
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setPress("Create new account")}
          onLongPress={() => {
            navigation.navigate("SignUpName")
            setModalVisible(false)
          }}
          className="h-[48px] w-full rounded-[5px] justify-center items-center"
          style={
            press === "Create new account" && { backgroundColor: "#0B52BC" }
          }
        >
          <Text className="text-center text-white text-[17px]">
            Create new account
          </Text>
        </Pressable>
      </Pressable>
    </Pressable>
  )
}

export default AddAccountModal
