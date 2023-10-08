import Cross from "assets/icons/Cross"
import { FC } from "react"
import { View, Pressable } from "react-native"
import LatoText from "./styled_components/LatoText"

type Props = {
  setLoginError: (value: boolean) => void
  setPhone: (value: string) => void
  setPassword: (value: string) => void
}

const ErrorMessage: FC<Props> = ({ setLoginError, setPhone, setPassword }) => {
  return (
    <View className="w-full flex justify-center items-center absolute bottom-[80px] ">
      <View
        className={`h-24 px-5 rounded-md bg-util-error flex flex-row justify-center items-center shadow-md `}
      >
        <LatoText classname="mr-8 text-sm">
          Incorrect mobile number or password.
        </LatoText>
        <Pressable
          onPress={() => {
            setLoginError(false)
            setPhone("")
            setPassword("")
          }}
        >
          <Cross />
        </Pressable>
      </View>
    </View>
  )
}

export default ErrorMessage
