import { View } from "react-native"

type Props = {
  onClicked: boolean
}

const CircleDot = ({ onClicked }: Props) => {
  return (
    <View className="relative">
      <View className="w-[16px] h-[16px] rounded-full bg-transparent border-[1px] border-white" />
      <View
        className={`w-[10px] h-[10px] rounded-full ${
          onClicked ? "bg-primary" : "bg-transparent"
        } absolute top-[3px] left-[3px]`}
      />
    </View>
  )
}

export default CircleDot
