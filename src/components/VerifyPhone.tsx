import { View, TextInput } from "react-native"
import InputBlueBg from "./settings/InputBlueBg"
import { Type } from "types/variantStyle"
import AuFlag from "assets/icons/AuFlag"
import LatoText from "./styled_components/LatoText"
import CustomColor from "constants/Colors"
import { checkNumber } from "utils/services/auth"

// Australian mobile numbers
const validateMobileNumber = (number: string) => {
  const pattern = /^(0)?[2-478](?:[ -]?[0-9]){8}$/
  return pattern.test(number)
}

type Props = {
  phone: string
  setPhone: (phone: string) => void
  setIsValid?: (isValid: boolean) => void
  setIsExists?: (isExists: boolean) => void
}

const VerifyPhone = ({ phone, setPhone, setIsValid, setIsExists }: Props) => {
  // TODO: workflow changed, need to update this component later
  const handleOnBlur = () => {
    if (!setIsValid) return
    if (validateMobileNumber(phone)) {
      setIsValid(true)
    } else {
      setIsValid(false)
      return
    }

    if (!setIsExists) return
    ;(async () => {
      // endpoint: /check-number
      const resp = await checkNumber({
        phone: "+61" + phone,
      })

      if (typeof resp === "undefined") return

      if (resp.exists) {
        setIsExists(true)
        return
      } else {
        setIsExists(false)
      }
    })()
  }

  return (
    <View>
      <InputBlueBg title={"Mobile number"} variant={Type.outlined}>
        <View className="flex flex-row w-[90px] h-full justify-around items-center ">
          <AuFlag />
          <LatoText classname="bottom-[1px]">+61</LatoText>
          <View className="h-[24px] w-[1px] bg-white" />
        </View>

        <TextInput
          className="text-white text-base flex-1 items-center justify-center w-full h-full pl-4 leading-[-2px] "
          keyboardType="phone-pad"
          keyboardAppearance="dark"
          cursorColor={CustomColor.gray.lighter}
          value={phone}
          onChangeText={setPhone}
          placeholderTextColor={CustomColor.gray.lighter}
          onBlur={handleOnBlur}
        />
      </InputBlueBg>
    </View>
  )
}

export default VerifyPhone
