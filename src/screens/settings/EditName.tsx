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

const EditName = () => {
  const navigate = useNavigation()
  const dispatch = useDispatch()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const [newName, setNewName] = useState(tmpUser.fullName)

  const handleSave = () => {
    // TODO: update user name to backend

    // To update fullName in tmpStore
    dispatch(
      tmpStoreAction.setItem({
        key: "fullName",
        item: newName,
      }),
    )

    navigate.goBack()
  }

  return (
    <SettingsScreenLayout>
      <InputBlueBg title="Full Name">
        <TextInput
          className="text-white text-[16px] w-auto"
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
