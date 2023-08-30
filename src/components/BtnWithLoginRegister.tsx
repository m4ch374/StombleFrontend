import { View, Text } from "react-native"
import FlatButton from "./styled_components/FlatButton"
import { Link } from "@react-navigation/native"
import LatoText from "./styled_components/LatoText"

// TODO: based on new design, will refactor later
interface Props {
  btnText: string
  ableToLogin: boolean
  disabled: boolean
  setDisabled: (disabled: boolean) => void
  onPress: () => void
}
const BtnWithLoginRegister = ({
  btnText,
  disabled,
  onPress,
  ableToLogin,
}: Props) => {
  return (
    <View className="mx-sm">
      <View className=" mb-md ">
        <FlatButton text={btnText} disabled={disabled} onPress={onPress} />
      </View>

      <View className="flex-row justify-center items-center align-middle mb-5">
        <LatoText classname="text-[14px]">
          {ableToLogin ? "Don't have an account?" : "Already have an account?"}
        </LatoText>

        <View className="ml-[2px]">
          {/* TODO: direct to SignUp screen */}
          <Link to={ableToLogin ? "/Login" : "/Login"}>
            <Text className="text-sm text-primary">
              {ableToLogin ? "Log In" : "Register"}
            </Text>
          </Link>
        </View>
      </View>
    </View>
  )
}

export default BtnWithLoginRegister
