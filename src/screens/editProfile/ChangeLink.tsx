// REFERENCE: <your screen ref on figma>
import { useNavigation } from "@react-navigation/native"
import InputBlueBg from "components/settings/InputBlueBg"
import FlatButton from "components/styled_components/FlatButton"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import LatoText from "components/styled_components/LatoText"
import CustomColor from "constants/Colors"
import { useState } from "react"
import { TextInput, View } from "react-native"
import { useDispatch } from "react-redux"
import { useAppSlector } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { Type } from "types/variantStyle"

const ChangeLink = () => {
  const { navigate } = useNavigation()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const dispatch = useDispatch()
  const [url, setUrl] = useState(tmpUser.link.url)
  const [text, setText] = useState(tmpUser.link.text)

  // TODO: backend endpoint not ready
  const handleUpdate = () => {
    dispatch(
      tmpStoreAction.setState({
        ...tmpUser,
        link: {
          url,
          text,
        },
        message: "Link updated successfully",
      }),
    )

    navigate("EditProfile", { screen: "EditProfileIndex" })
  }

  return (
    <GeneralScreenLayout>
      <View className="h-[225px] flex justify-between">
        <InputBlueBg title="Link URL" variant={Type.outlined}>
          <TextInput
            className="text-white text-base w-full h-full"
            value={url}
            onChangeText={setUrl}
            placeholder="Enter your link URL"
            placeholderTextColor={CustomColor.gray.lighter}
            textContentType="URL"
            keyboardAppearance="dark"
          />
        </InputBlueBg>

        <View>
          <InputBlueBg title="Link text" variant={Type.outlined}>
            <TextInput
              className="text-white text-base w-full h-full"
              value={text}
              onChangeText={setText}
              placeholder="Enter your link text"
              placeholderTextColor={CustomColor.gray.lighter}
              textContentType="name"
              keyboardAppearance="dark"
            />
          </InputBlueBg>
          <LatoText classname="text-7 text-gray-lighter mt-3">
            This will display as your link’s clickable text. Leave it blank to
            show the URL instead.
          </LatoText>
        </View>
      </View>

      <FlatButton text={"update link"} onPress={handleUpdate} />
    </GeneralScreenLayout>
  )
}

export default ChangeLink
