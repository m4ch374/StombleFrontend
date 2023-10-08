import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from "react-native"

type Props = {
  children: React.ReactNode
  paddingX?: string
  marginTop?: string
  marginBottom?: string
}

const GeneralScreenLayout = ({
  children,
  paddingX = "px-8",
  marginTop = "mt-24",
  marginBottom = "mb-20",
}: Props) => {
  return (
    <SafeAreaView className="bg-background h-full">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          className={`h-full flex-1 justify-between ${paddingX} ${marginTop} ${marginBottom}`}
        >
          {children}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default GeneralScreenLayout
