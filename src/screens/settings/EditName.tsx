// REFERENCE: Setting - Personal - EditName

import { useNavigation } from "@react-navigation/native"
import SettingsScreenLayout from "components/styled_components/SettingsScreenLayout"
import SmButton from "components/styled_components/SmButton"
import { useState } from "react"
import { View, Text, TextInput } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useAppSlector } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { useDispatch } from "react-redux"
import InputBlueBg from "components/InputBlueBg"
import Fetcher from "utils/Fetcher"
import { accountEP } from "constants/Endpoint"
import { TUpdateUserInfo } from "types/endpoints"

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

      // TODO: need return a success message back to AccountInfo screen
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
            <AntDesign name="exclamationcircleo" size={24} color="#F4222F" />
            <Text className="text-error mx-2">
              Please enter your name to save changes
            </Text>
          </View>
        )}
      </InputBlueBg>
    </SettingsScreenLayout>
  )
}

export default EditName
