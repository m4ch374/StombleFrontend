// REFERENCE: <your screen ref on figma>
import { useNavigation } from "@react-navigation/native"
import InputBlueBg from "components/settings/InputBlueBg"
import FlatButton from "components/styled_components/FlatButton"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import CustomColor from "constants/Colors"
import { useState } from "react"
import { TextInput } from "react-native"
import { useDispatch } from "react-redux"
import { useAppSlector } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { Type } from "types/variantStyle"

const ChangeBio = () => {
  const { navigate } = useNavigation()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const dispatch = useDispatch()
  const [bio, setBio] = useState(tmpUser.bio)

  // TODO: backend endpoint not ready
  const handleUpdate = () => {
    dispatch(
      tmpStoreAction.setState({
        ...tmpUser,
        bio,
        message: "Bio updated successfully",
      }),
    )

    navigate("EditProfile", { screen: "EditProfileIndex" })
  }

  return (
    <GeneralScreenLayout>
      <InputBlueBg title="Bio" variant={Type.outlined}>
        <TextInput
          className="text-white text-base w-full h-full"
          value={bio}
          placeholder={"Write your bio"}
          onChangeText={setBio}
          placeholderTextColor={CustomColor.gray.lighter}
          textContentType="jobTitle"
          keyboardAppearance="dark"
        />
      </InputBlueBg>

      <FlatButton text={"update bio"} onPress={handleUpdate} />
    </GeneralScreenLayout>
  )
}

export default ChangeBio
