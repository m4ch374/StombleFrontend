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
import LatoText from "components/styled_components/LatoText"
import CustomColor from "constants/Colors"
import { updatePersonalInfo } from "utils/services/accountInfo"

const EditName = () => {
  const navigate = useNavigation()
  const dispatch = useDispatch()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const [newName, setNewName] = useState(tmpUser.fullName)

  const handleSave = () => {
    ;(async () => {
      // endpoint: update user name to backend
      const payload = {
        attribute: "name",
        userId: tmpUser.userId,
        value: newName,
      } as const

      const resp = await updatePersonalInfo(payload)

      if (typeof resp === "undefined") return

      // To update fullName in tmpStore
      dispatch(
        tmpStoreAction.setState({
          ...tmpUser,
          fullName: newName,
          message: "Name updated successfully",
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
