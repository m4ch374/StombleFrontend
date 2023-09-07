import { View, TouchableOpacity } from "react-native"
import { useState } from "react"

const CircleButton = () => {
  const [onClicked, setOnClicked] = useState(false)

  const handleButtonClick = () => {
    setOnClicked(!onClicked)
  }

  return (
    <TouchableOpacity onPress={handleButtonClick}>
      <View className="relative">
        <View className="w-[16px] h-[16px] rounded-full bg-transparent border-[1px] border-white" />
        <View
          className={`w-[10px] h-[10px] rounded-full ${
            onClicked ? "bg-primary" : "bg-transparent"
          } absolute top-[3px] left-[3px]`}
        />
      </View>
    </TouchableOpacity>
  )
}

export default CircleButton
