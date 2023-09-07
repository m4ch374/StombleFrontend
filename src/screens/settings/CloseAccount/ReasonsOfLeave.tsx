// REFERENCE: Setting - Personal - Close Account

//----------------------------------------------------------------
// Waiting for new design
//----------------------------------------------------------------
import { useNavigation } from "@react-navigation/native"
import CircleButton from "components/settings/CircleButton"
import FlatButton from "components/styled_components/FlatButton"
import LinearBgLayout from "components/styled_components/LinearBgLayout"
import { Text, View } from "react-native"

const ReasonsOfLeave = () => {
  const { navigate } = useNavigation()

  return (
    <LinearBgLayout>
      <View>
        <Text className="text-white text-[18px] mb-4">
          Why are you leaving Stomble?
        </Text>

        <Text className="text-white text-[14px] mb-10">
          We’re sorry to see you go. We’d like to know why you are deleting your
          account, so that we could improve the app and support our community.
        </Text>

        <View className="w-full flex flex-col gap-6">
          <View className="w-full flex flex-row justify-between">
            <Text className="text-white text-[16px]">
              I spend too much time on Stomble
            </Text>
            <CircleButton />
          </View>
          <View className="w-full flex flex-row justify-between">
            <Text className="text-white text-[16px]">
              Safety or privacy concerns
            </Text>
            <CircleButton />
          </View>
          <View className="w-full flex flex-row justify-between">
            <Text className="text-white text-[16px]">
              Too many irrelevant ads
            </Text>
            <CircleButton />
          </View>
          <View className="w-full flex flex-row justify-between">
            <Text className="text-white text-[16px]">
              Trouble getting started
            </Text>
            <CircleButton />
          </View>
          <View className="w-full flex flex-row justify-between">
            <Text className="text-white text-[16px]">
              I have multiple accounts
            </Text>
            <CircleButton />
          </View>
          <View className="w-full flex flex-row justify-between">
            <Text className="text-white text-[16px]">Another reason</Text>
            <CircleButton />
          </View>
        </View>
      </View>

      <FlatButton
        text={"CONTINUE"}
        onPress={() => navigate("Settings", { screen: "ConfirmOfLeave" })}
        disabled={false}
      />
    </LinearBgLayout>
  )
}

export default ReasonsOfLeave
