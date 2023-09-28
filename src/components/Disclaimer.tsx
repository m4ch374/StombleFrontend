import { Link } from "@react-navigation/native"
import { View, Text } from "react-native"
import LatoText from "./styled_components/LatoText"

const Disclaimer = () => {
  return (
    <View className="flex-row justify-center items-center mb-[16px]">
      <LatoText classname="text-6">By continuing you agree to the</LatoText>

      <View className="px-[4px]">
        <LatoText classname="text-secondary text-6 font-lato-bold">
          <Link to={""}>Terms of Service</Link>
        </LatoText>
      </View>

      <LatoText classname="text-6">and</LatoText>

      <View className="pl-[4px]">
        <Text className="text-secondary text-6 font-lato-bold">
          <Link to={""}>Privacy Policies</Link>
        </Text>
      </View>
    </View>
  )
}

export default Disclaimer
