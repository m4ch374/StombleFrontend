import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from "react-native"

type Props = {
  children: React.ReactNode
}

const SettingsScreenLayout = ({ children }: Props) => {
  return (
    <SafeAreaView className="bg-background h-full ">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="h-full flex justify-between p-md">{children}</View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default SettingsScreenLayout
