import { Text, TouchableOpacity } from "react-native"

type SmButtonProps = {
  text: string
  variation?: "filled" | "outlined"
  onPress: () => void
}

const SmButton = ({ text, variation, onPress }: SmButtonProps) => {
  return (
    <TouchableOpacity
      className={`h-[24px] w-[64px] rounded-[5px] border border-white bg-transparent justify-center items-center ${
        variation === "filled" && "bg-btnActive border-transparent"
      }`}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Text className={`text-white text-[12px] `}>{text}</Text>
    </TouchableOpacity>
  )
}

export default SmButton
