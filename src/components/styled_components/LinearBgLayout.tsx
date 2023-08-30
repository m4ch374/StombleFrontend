import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native"
import React from "react"
import { LinearGradient } from "expo-linear-gradient"

type Props = {
  y?: number
  children: React.ReactNode
}

// Waiting for new design, maybe this will be removed
const LinearBgLayout = ({ children, y }: Props) => {
  return (
    <LinearGradient
      className="h-full"
      colors={["#020235", "#000000"]}
      start={{ x: 0, y: y || 0.5 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="h-full flex justify-between p-[16px]">
            {children}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default LinearBgLayout
