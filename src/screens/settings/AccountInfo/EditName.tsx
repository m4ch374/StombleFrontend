// REFERENCE: Setting - Personal - EditName

import { useNavigation } from "@react-navigation/native"
import SettingsScreenLayout from "components/settings/SettingsScreenLayout"
import SmButton from "components/settings/SmButton"
import { useState } from "react"
import { View, TextInput } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useAppSlector } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { useDispatch } from "react-redux"
import InputBlueBg from "components/settings/InputBlueBg"
import Fetcher from "utils/Fetcher"
import { accountEP } from "constants/Endpoint"
import { TUpdateUserInfo } from "types/endpoints"
import LatoText from "components/styled_components/LatoText"
import CustomColor from "constants/Colors"

const EditName = () => {
  const navigate = useNavigation()
  const dispatch = useDispatch()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const [newName, setNewName] = useState(tmpUser.fullName)

  const handleSave = () => {
    // endpoint: update user name to backend
    ;(async () => {
      const resp = await Fetcher.init<TUpdateUserInfo>(
        "PUT",
        accountEP.UPDATE_PERSONAL_INFO,
      )
        .withJsonPaylad({
          attribute: "name",
          userId: tmpUser.userId,
          value: newName,
        })
        .withCurrentToken()
        .fetchData()

      if (typeof resp === "undefined") return

      // To update fullName in tmpStore
      dispatch(
        tmpStoreAction.setItem({
          key: "fullName",
          item: newName,
        }),
      )
      dispatch(
        tmpStoreAction.setItem({
          key: "message",
          item: "Name updated successfully",
        }),
      )

      navigate.goBack()
    })()
  }

  return (
    <SettingsScreenLayout>
      <InputBlueBg title="Full Name">
        <TextInput
          className="text-white text-[16px] w-[270px]"
          value={newName}
          onChangeText={setNewName}
        />
        <SmButton text={"Save"} variation="filled" onPress={handleSave} />
        {!newName && (
          <View className="flex flex-row items-center">
            <AntDesign
              name="exclamationcircleo"
              size={24}
              color={CustomColor.util.error}
            />
            <LatoText classname="text-util-error mx-2">
              Please enter your name to save changes
            </LatoText>
          </View>
        )}
      </InputBlueBg>
    </SettingsScreenLayout>
  )
}

export default EditName
