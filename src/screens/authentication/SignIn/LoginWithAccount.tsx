// REFERENCE: Log in - Existing accounts

import { View, Text, Modal, ScrollView, TouchableOpacity } from "react-native"
import { useState } from "react"
import { AntDesign } from "@expo/vector-icons"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AuthStackList } from "types/Navigation"
import SmallButton from "components/styled_components/SmallButton"
import AccountFileCard from "components/AccountFileCard"
import AddAccountModal from "components/AddAccountModal"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { BusinessAccountInformationItem } from "../../../types/endpoints"
import { useAppDispatch } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import LatoText from "components/styled_components/LatoText"

interface Props {
  navigation: NativeStackNavigationProp<AuthStackList, "LoginWithAccount">
}

const LandingWithAccount = ({ navigation }: Props) => {
  const navigate = useNavigation()
  const dispatch = useAppDispatch()
  const route = useRoute<RouteProp<AuthStackList, "LoginWithAccount">>()
  const business = route.params.business || []
  const [modalVisible, setModalVisible] = useState(false)

  const selectAccount = (account: BusinessAccountInformationItem) => {
    //TODO: Once the business is chosen we need to store the data in redux!!
    console.log("-----> ~ selectAccount ~ account:", account)
    dispatch(
      tmpStoreAction.setState(state => {
        state.isLogged = true
        return state
      }),
    )
    navigate.navigate("LoginRoot", { screen: "Home" })
  }

  return (
    <GeneralScreenLayout marginTop="mt-12">
      <View className="flex-1">
        <LatoText classname="font-AT text-center text-[38px] mb-14">
          stomble
        </LatoText>

        <LatoText classname="text-[14px] mb-20 text-center">
          Select the account you want to log in to.
        </LatoText>

        <ScrollView className="flex-1 gap-[20px] mt-4">
          {business.map((account, i) => (
            <View
              className="flex-1 flex-row justify-between"
              key={`${account.id}-${i}`}
            >
              <AccountFileCard
                text={account.businessName}
                uri={account.link_icon}
                height={48}
                width={48}
                borderRadius={50}
                category={"Business Account"}
              />

              {/* TODO: Ask for clarification */}
              <SmallButton
                bgColor="#0B52BC"
                width={80}
                height={32}
                text="Login"
                onPress={() => selectAccount(account)}
              />
            </View>
          ))}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="flex flex-row items-center"
          >
            <View className="h-[48px] rounded-full aspect-square border-[#4F4F4F] border flex justify-center items-center">
              <AntDesign name="plus" size={20} color="#ffffff"></AntDesign>
            </View>
            <Text className="text-white ml-5 text-md">Add Account</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Add account modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 items-center h-[210px] w-full justify-end ">
            {
              <AddAccountModal
                setModalVisible={setModalVisible}
                navigation={navigation}
              />
            }
          </View>
        </Modal>
      </View>
    </GeneralScreenLayout>
  )
}

export default LandingWithAccount
