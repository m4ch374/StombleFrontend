// Thanks Yume! - Henry

import React from "react"
import SwipableModal from "./styled_components/SwipableModal"
import ModalSettingsBtn from "./profile/ModalSettingsBtn"
import * as ImagePicker from "expo-image-picker"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { deleteIcon, updateIcon } from "utils/services/accountInfo"
import { TUpdateIcon } from "types/endpoints"
import { useNavigation } from "@react-navigation/native"
import { Divider } from "react-native-elements"
import CustomColor from "constants/Colors"

type TChangeProfileModal = {
  stateController: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const ChangeProfileModal: React.FC<TChangeProfileModal> = ({
  stateController,
}) => {
  const { navigate } = useNavigation()
  const [visible, setVisible] = stateController

  const tmpUser = useAppSlector(state => state.tmpStore)
  const dispatch = useAppDispatch()

  const handleGotoTakePhoto = () => {
    navigate("Settings", { screen: "TakePhoto" })
    setVisible(false)
  }

  const handleChoosePhoto = (): void => {
    ;(async () => {
      // TODO: need user permission access to photo
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.3,
        base64: true,
      })

      if (result.canceled) return

      const payload = {
        iconFile: {
          base64: result.assets[0].base64,
          name: result.assets[0].fileName,
          type: "image",
          size: result.assets[0].fileSize?.toString(),
          ext: result.assets[0].uri.split(".").pop(),
        },
        userId: tmpUser.userId,
      } as TUpdateIcon["requestType"]

      // endpoint: upload photo to backend
      const resp = await updateIcon(payload)

      if (typeof resp === "undefined") return

      dispatch(
        tmpStoreAction.setState({
          ...tmpUser,
          link_icon: result.assets[0].uri,
          message: "Profile picture changed successfully",
        }),
      )

      setVisible(false)
    })()
  }

  // endpoint: /delete-icon
  const handleRemovePhoto = () => {
    ;(async () => {
      const payload = {
        businessId: tmpUser.businessId || undefined,
      }

      const resp = await deleteIcon(payload)

      if (resp.statusCode !== 200) return

      dispatch(
        tmpStoreAction.setState({
          ...tmpUser,
          link_icon: "",
          message: resp.message,
        }),
      )
      setVisible(false)
    })()
  }

  return (
    <SwipableModal stateController={[visible, setVisible]}>
      <ModalSettingsBtn onPress={handleGotoTakePhoto}>
        Take photo
      </ModalSettingsBtn>

      <Divider className="w-full opacity-10" color={CustomColor.white} />

      <ModalSettingsBtn onPress={handleChoosePhoto}>
        Choose photo
      </ModalSettingsBtn>

      <Divider className="w-full opacity-10" color={CustomColor.white} />

      <ModalSettingsBtn onPress={handleRemovePhoto}>
        Remove current picture
      </ModalSettingsBtn>
    </SwipableModal>
  )
}

export default ChangeProfileModal
