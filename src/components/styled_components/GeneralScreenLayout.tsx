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
  paddingX = "8",
  marginTop = "24",
  marginBottom = "20",
}: Props) => {
  return (
    <SafeAreaView className="bg-background h-full">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          className={`h-full flex-1 justify-between px-${paddingX} mt-${marginTop} mb-${marginBottom}`}
        >
          {children}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default GeneralScreenLayout
