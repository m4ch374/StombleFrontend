// REFERENCE: Setting - Personal - EditName

import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { TextInput } from "react-native"
import { useAppSlector } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { useDispatch } from "react-redux"
import InputBlueBg from "components/settings/InputBlueBg"
import CustomColor from "constants/Colors"
import { updatePersonalInfo } from "utils/services/accountInfo"
import { Type } from "types/variantStyle"
import FlatButton from "components/styled_components/FlatButton"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"

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
    <GeneralScreenLayout>
      <InputBlueBg title="Full Name" variant={Type.outlined}>
        <TextInput
          className="text-white text-base w-full h-full"
          value={newName}
          onChangeText={setNewName}
          placeholder="Enter your full name"
          placeholderTextColor={CustomColor.gray.lighter}
          keyboardAppearance="dark"
        />
      </InputBlueBg>
      <FlatButton
        text={"update name"}
        onPress={handleSave}
        disabled={!newName}
      />
    </GeneralScreenLayout>
  )
}

export default EditName
