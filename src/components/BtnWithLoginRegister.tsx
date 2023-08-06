/* eslint-disable react/no-unescaped-entities */
import { View, Text } from "react-native"
import FlatButton from "./styled_components/FlatButton"
import { Link } from "@react-navigation/native"

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
    <View className="mx-4">
      <View className=" mb-[16px] ">
        <FlatButton text={btnText} disabled={disabled} onPress={onPress} />
      </View>

      <View className="flex-row justify-center items-center align-middle mb-5">
        <Text className="text-sm text-white">
          {ableToLogin ? "Don't have an account?" : "Already have an account?"}
        </Text>

        <View className="ml-[2px]">
          {/* TODO: direct to SignUp screen */}
          <Link to={ableToLogin ? "/Login" : "/Login"}>
            <Text className="text-sm text-[#326FCB]">
              {ableToLogin ? "Log In" : "Register"}
            </Text>
          </Link>
        </View>
      </View>
    </View>
  )
}

export default BtnWithLoginRegister
