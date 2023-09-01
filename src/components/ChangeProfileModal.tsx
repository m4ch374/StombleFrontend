// Thanks Yume! - Henry

import React from "react"
import SwipableModal from "./styled_components/SwipableModal"
import ModalSettingsBtn from "./profile/ModalSettingsBtn"
import * as ImagePicker from "expo-image-picker"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { updateIcon } from "utils/services/accountInfo"
import { TUpdateIcon } from "types/endpoints"

type TChangeProfileModal = {
  stateController: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const ChangeProfileModal: React.FC<TChangeProfileModal> = ({
  stateController,
}) => {
  const [visible, setVisible] = stateController

  const tmpUser = useAppSlector(state => state.tmpStore)
  const dispatch = useAppDispatch()

  // TODO: take photo
  const handleTakePhoto = () => {}

  const handleChoosePhoto = (): void => {
    ;(async () => {
      // TODO: need user permission access to photo
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
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
        tmpStoreAction.setItem({
          key: "link_icon",
          item: result.assets[0].uri,
        }),
      )
      dispatch(
        tmpStoreAction.setItem({
          key: "message",
          item: "Profile picture changed successfully",
        }),
      )

      setVisible(false)
    })()
  }

  // TODO: remove photo
  const handleRemovePhoto = () => {}

  return (
    <SwipableModal stateController={[visible, setVisible]}>
      <ModalSettingsBtn onPress={handleTakePhoto}>Take photo</ModalSettingsBtn>

      <ModalSettingsBtn onPress={handleChoosePhoto}>
        Choose photo
      </ModalSettingsBtn>

      <ModalSettingsBtn onPress={handleRemovePhoto}>
        Remove current picture
      </ModalSettingsBtn>
    </SwipableModal>
  )
}

export default ChangeProfileModal