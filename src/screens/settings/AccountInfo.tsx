// REFERENCE: Setting - Personal

import { View, Text, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import SettingsScreenLayout from "components/styled_components/SettingsScreenLayout"
import FlatButton from "components/styled_components/FlatButton"
import SmButton from "components/styled_components/SmButton"
import { useNavigation } from "@react-navigation/native"
import { useAppSlector } from "redux/hooks"
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import InputBlueBg from "components/InputBlueBg"
import AccountFileCard from "components/AccountFileCard"
import SwipableModal from "components/styled_components/SwipableModal"
import ModalSettingsBtn from "components/profile/ModalSettingsBtn"
import * as ImagePicker from "expo-image-picker"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { useDispatch } from "react-redux"
import { TUpdateIcon } from "types/endpoints"
import { accountEP } from "constants/Endpoint"
import Fetcher from "utils/Fetcher"
import PopupMessage from "components/PopupMessage"

const AccountInfo: React.FC = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const [visible, setVisible] = useState(false)

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
    <SettingsScreenLayout>
      <View className="flex-1">
        <View className="flex mb-8 justify-center items-center">
          <View className="w-[60px] h-[60px] relative">
            <AccountFileCard
              uri={tmpUser.link_icon}
              height={60}
              width={60}
              borderRadius={50}
            />
            <TouchableOpacity
              onPress={() => setVisible(true)}
              className="w-[18px] h-[18px] absolute bottom-0 right-0 bg-white rounded-2xl flex items-center justify-center border-[1px] border-bgSetting "
            >
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={12}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        <InputBlueBg title="Full Name">
          <Text className="text-white text-[16px]">{tmpUser.fullName}</Text>
          <SmButton
            text={"Edit"}
            onPress={() =>
              navigate("Settings", {
                screen: "EditName",
              })
            }
          />
        </InputBlueBg>

        <InputBlueBg title="Mobile Number">
          <Text className="text-white text-[16px]">{tmpUser.phone}</Text>
          <View className="flex flex-row items-center">
            <AntDesign
              name="checkcircleo"
              size={14}
              color="#00CA23"
              style={{ marginRight: 10 }}
            />
            <SmButton
              text={"Change"}
              onPress={() => navigate("Settings", { screen: "EditPhone" })}
            />
          </View>
        </InputBlueBg>

        <InputBlueBg title="Email">
          <Text className="text-white text-[16px]">
            {tmpUser.email || "Enter Email address"}
          </Text>
          <View className="flex flex-row items-center">
            <AntDesign
              name="checkcircleo"
              size={14}
              color={tmpUser.email ? "#00CA23" : "transparent"}
              style={{ marginRight: 10 }}
            />
            <SmButton
              text={tmpUser.email ? "Change" : "Add"}
              onPress={() => navigate("Settings", { screen: "AddEmail" })}
            />
          </View>
        </InputBlueBg>

        <InputBlueBg title="Password">
          <Text className="text-white text-[16px]">
            {"*".repeat(tmpUser.pswLength)}
          </Text>
          <SmButton
            text={"Change"}
            onPress={() => navigate("Settings", { screen: "ChangePassword" })} // temporary navigate to ChangePassword screen, skip code verification
          />
        </InputBlueBg>
      </View>

      <View className="flex flex-col h-28 justify-between">
        <View className="flex-1 justify-start items-center ">
          {tmpUser.message && <PopupMessage />}
        </View>
        <FlatButton
          text={"Close Account"}
          onPress={() =>
            navigate("Settings", { screen: "CloseAccountStepOne" })
          }
          variation="outlined"
        />

        <SwipableModal stateController={[visible, setVisible]}>
          <ModalSettingsBtn onPress={handleTakePhoto}>
            Take photo
          </ModalSettingsBtn>

          <ModalSettingsBtn onPress={handleChoosePhoto}>
            Choose photo
          </ModalSettingsBtn>

          <ModalSettingsBtn onPress={handleRemovePhoto}>
            Remove current picture
          </ModalSettingsBtn>
        </SwipableModal>
      </View>
    </SettingsScreenLayout>
  )
}

export default AccountInfo
