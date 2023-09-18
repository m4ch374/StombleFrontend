import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from "react-native"

type Props = {
  children: React.ReactNode
}

const GeneralScreenLayout = ({ children }: Props) => {
  return (
    <SafeAreaView className="bg-background h-full">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="h-full flex justify-between px-8 pt-10 pb-20">
          {children}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default GeneralScreenLayout
