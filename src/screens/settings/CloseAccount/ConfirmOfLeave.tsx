// REFERENCE: Setting - Personal - Close Account

//----------------------------------------------------------------
// Waiting for new design
//----------------------------------------------------------------
import { useNavigation } from "@react-navigation/native"
import AccountFileCard from "components/AccountFileCard"
import SettingsScreenLayout from "components/settings/SettingsScreenLayout"
import FlatButton from "components/styled_components/FlatButton"
import { View, Text } from "react-native"
import { useAppSlector } from "redux/hooks"

const ConfirmOfLeave = () => {
  const { navigate } = useNavigation()
  const tmpUser = useAppSlector(state => state.tmpStore)

  return (
    <SettingsScreenLayout>
      <View className="flex-1">
        <View className="flex mb-8 justify-center items-center">
          <View className="w-[80px] h-[105px] relative">
            <AccountFileCard
              uri={tmpUser.link_icon}
              height={80}
              width={80}
              borderRadius={50}
            />
            <Text className="flex text-center text-white text-[14px] font-LatoBold">
              {tmpUser.fullName}
            </Text>
          </View>
        </View>

        <View>
          <Text className="text-white text-[18px] font-LatoBold mb-6">
            Are you sure you want to delete this account?
          </Text>
          <View className="flex gap-4">
            <Text className="text-white text-[14px]">
              If you close your account :
            </Text>
            <Text className="text-white text-[14px]">
              You won’t be able to log in and use any services within that
              Stomble account.
            </Text>
            <Text className="text-white text-[14px]">
              You won’t be able to access information stored in the account,
              such as liked videos or videos in draft.
            </Text>
            <Text className="text-white text-[14px]">
              You will lose access to all your videos.
            </Text>

            <Text className="text-white text-[14px]">
              Do you want to continue?
            </Text>
          </View>
        </View>
      </View>

      <FlatButton
        text={"CONTINUE"}
        onPress={() => {
          navigate("Settings", { screen: "VerifyCodeForLeave" })
        }}
        disabled={false}
      />
    </SettingsScreenLayout>
  )
}

export default ConfirmOfLeave
