import LatoText from "components/styled_components/LatoText"
import { TouchableOpacity } from "react-native"
import { Type } from "types/variantStyle"

type SmButtonProps = {
  text: string
  variation?: Type
  onPress: () => void
}

const SmButton = ({ text, variation, onPress }: SmButtonProps) => {
  return (
    <TouchableOpacity
      className={`h-[30px] w-[72px] rounded-sm border border-white bg-transparent justify-center items-center ${
        variation === Type.filled && "bg-primary border-transparent"
      }`}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <LatoText classname={`text-[12px] font-lato-bold`}>{text}</LatoText>
    </TouchableOpacity>
  )
}

export default SmButton
