// REFERENCE: Setting - Personal - Close Account

import { useNavigation } from "@react-navigation/native"
import AccountFileCard from "components/AccountFileCard"
import FlatButton from "components/styled_components/FlatButton"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import LatoText from "components/styled_components/LatoText"
import { View, FlatList } from "react-native"
import { useAppSlector } from "redux/hooks"

const closeAccount = [
  {
    notice:
      "You won't be able to log in and use any services within that Stomble account.",
  },
  {
    notice:
      "You won’t be able to access information stored in the account, such as liked videos or videos in draft.",
  },
  { notice: "You will lose access to all your videos." },
]

const ConfirmOfLeave = () => {
  const { navigate } = useNavigation()
  const tmpUser = useAppSlector(state => state.tmpStore)

  return (
    <GeneralScreenLayout>
      <View className="mt-[-40px]">
        <View className="w-full flex my-20 items-center">
          <View className="w-[80px] h-[80px] flex justify-center mb-4">
            <AccountFileCard
              uri={tmpUser.link_icon}
              height={80}
              width={80}
              borderRadius={50}
            />
          </View>
          <View>
            <LatoText classname="text-[14px] font-lato-bold">
              {tmpUser.fullName}
            </LatoText>
          </View>
        </View>

        <View>
          <LatoText classname="font-lato-bold mb-5">
            Are you sure you want to delete this account?
          </LatoText>
          <LatoText classname="text-[14px] mb-5">
            If you close your account :
          </LatoText>
          <FlatList
            data={closeAccount}
            renderItem={({ item }) => {
              return (
                <View style={{ marginBottom: 10 }}>
                  <LatoText classname="text-[14px] ml-4">{`\u2022 ${item.notice}`}</LatoText>
                </View>
              )
            }}
          />
          <LatoText classname="text-[14px]">Do you want to continue?</LatoText>
        </View>
      </View>

      <FlatButton
        text={"CONTINUE"}
        onPress={() => {
          navigate("Settings", { screen: "VerifyCodeForLeave" })
        }}
        disabled={false}
      />
    </GeneralScreenLayout>
  )
}

export default ConfirmOfLeave
