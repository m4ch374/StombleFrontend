import LatoText from "components/styled_components/LatoText"
import { TouchableOpacity } from "react-native"

type SmButtonProps = {
  text: string
  variation?: "filled" | "outlined"
  onPress: () => void
}

const SmButton = ({ text, variation, onPress }: SmButtonProps) => {
  return (
    <TouchableOpacity
      className={`h-[24px] w-[64px] rounded-sm border border-white bg-transparent justify-center items-center ${
        variation === "filled" && "bg-primary border-transparent"
      }`}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <LatoText classname={`text-[12px] `}>{text}</LatoText>
    </TouchableOpacity>
  )
}

export default SmButton
