// REFERENCE: Edit Profile

import { TouchableOpacity, View } from "react-native"
import { useState } from "react"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import EditableProfileIcon from "components/EditableProfileIcon"
import { useAppSlector } from "redux/hooks"
import InputBlueBg from "components/settings/InputBlueBg"
import { Type } from "types/variantStyle"
import SmButton from "components/settings/SmButton"
import ChangeProfileModal from "components/ChangeProfileModal"
import LatoText from "components/styled_components/LatoText"
import { useNavigation } from "@react-navigation/native"
import PopupMessage from "components/settings/PopupMessage"

const EditProfileIndex = () => {
  const { navigate } = useNavigation()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const [visible, setVisible] = useState(false)

  const handleAddGender = () => navigate("EditProfile", { screen: "AddGender" })
  const handleChangeBio = () => navigate("EditProfile", { screen: "ChangeBio" })
  const handleChangeLink = () =>
    navigate("EditProfile", { screen: "ChangeLink" })

  return (
    <GeneralScreenLayout>
      <View className="flex-1 justify-between">
        <View className="flex flex-col space-y-14">
          <View className="flex mb-4 justify-center items-center space-y-4">
            <EditableProfileIcon
              profile_link={tmpUser.link_icon}
              setModalVisible={setVisible}
            />
            <TouchableOpacity
              className=""
              onPress={() => setVisible(!visible)}
              activeOpacity={0.6}
            >
              <LatoText classname={`text-secondary font-lato-bold`}>
                Change profile picture
              </LatoText>
            </TouchableOpacity>
          </View>

          <View>
            <InputBlueBg
              title="Gender"
              userInfo={tmpUser.gender || "Not added"}
              variant={Type.filled}
            >
              <SmButton
                text={tmpUser.gender ? "Change" : "Add"}
                onPress={handleAddGender}
                variation={tmpUser.gender ? Type.outlined : Type.filled}
              />
            </InputBlueBg>
          </View>

          <View>
            <InputBlueBg
              title="Bio"
              userInfo={tmpUser.bio || "Not added"}
              variant={Type.filled}
            >
              <SmButton
                text={tmpUser.bio ? "Change" : "Add"}
                onPress={handleChangeBio}
                variation={tmpUser.bio ? Type.outlined : Type.filled}
              />
            </InputBlueBg>
          </View>

          <View>
            <InputBlueBg
              title="Link"
              userInfo={tmpUser.link.url || "Not added"}
              variant={Type.filled}
            >
              <SmButton
                text={tmpUser.link.url ? "Change" : "Add"}
                onPress={handleChangeLink}
                variation={tmpUser.link.url ? Type.outlined : Type.filled}
              />
            </InputBlueBg>
          </View>
        </View>

        <View className="mb-20 justify-start items-center">
          {tmpUser.message && <PopupMessage />}
        </View>
      </View>

      <ChangeProfileModal stateController={[visible, setVisible]} />
    </GeneralScreenLayout>
  )
}

export default EditProfileIndex
