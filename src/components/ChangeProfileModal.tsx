// Thanks Yume! - Henry

import React from "react"
import SwipableModal from "./styled_components/SwipableModal"
import ModalSettingsBtn from "./profile/ModalSettingsBtn"
import * as ImagePicker from "expo-image-picker"
import Fetcher from "utils/Fetcher"
import { TUpdateIcon } from "types/endpoints"
import { accountEP } from "constants/Endpoint"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"

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
      // TODO: need user permission access to photo?
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      })

      if (result.canceled) {
        console.log("Image selection cancelled")
        return
      }

      // ----------------------- ISSUE -----------------------
      // Unable to upload image with a large size
      // Possible Reason: the base64 string is too big
      // ( base64 encoded image roughly 33% bigger than the original and AWS Lambda may has a request limit in size and pixels)
      // Solution: looking for ways to resize before upload (next sprint task)
      // -----------------------------------------------------
      console.log("the size of image:", result.assets[0].fileSize)

      const file = {
        base64: result.assets[0].base64,
        name: result.assets[0].fileName,
        type: result.assets[0].type,
        size: result.assets[0].fileSize,
        ext: result.assets[0].fileName?.split(".").pop(),
      }

      // endpoint: upload photo to backend
      const resp = await Fetcher.init<TUpdateIcon>(
        "POST",
        accountEP.UPDATE_ICON,
      )
        .withJsonPaylad({
          iconFile: file,
          userId: tmpUser.userId,
        })
        .withCurrentToken()
        .fetchData()

      console.log("is img uploaded?", resp)
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
