import { useNavigation } from "@react-navigation/native"
import { View, Text, Pressable } from "react-native"
import FlatButton from "./styled_components/FlatButton"
import LatoText from "./styled_components/LatoText"

interface Props {
  btnText: string
  action?: "login" | "signup"
  disabled: boolean
  setDisabled: (disabled: boolean) => void
  onPress: () => void
}
const BtnWithLoginRegister = ({
  btnText,
  disabled,
  onPress,
  action = "login",
}: Props) => {
  const { navigate } = useNavigation()

  return (
    <View>
      <View className="mb-md">
        <FlatButton text={btnText} disabled={disabled} onPress={onPress} />
      </View>

      <View className="flex-row justify-center items-center align-middle mb-5">
        <LatoText classname="text-[14px]">
          {action === "login"
            ? "Already have an account?"
            : "Don't have an account?"}
        </LatoText>

        <Pressable
          onPress={() => {
            action === "login"
              ? navigate("Auth", { screen: "Login" })
              : navigate("Auth", { screen: "VerifyPhone" })
          }}
        >
          <Text className="text-sm text-secondary font-lato-bold">
            {action === "login" ? " Log in" : " Sign up now"}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default BtnWithLoginRegister
