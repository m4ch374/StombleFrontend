// REFERENCE: Setting - Personal

import {
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native"
import SmButton from "components/settings/SmButton"
import { useNavigation } from "@react-navigation/native"
import { useAppSlector } from "redux/hooks"
import InputBlueBg from "components/settings/InputBlueBg"
import PopupMessage from "components/settings/PopupMessage"
import OutlinedButton from "components/settings/OutlinedButton"
import { Type } from "types/variantStyle"
import EditableProfileIcon from "components/EditableProfileIcon"
import LatoText from "components/styled_components/LatoText"
import { useState } from "react"
import ChangeProfileModal from "components/ChangeProfileModal"

const AccountInfoIndex: React.FC = () => {
  const { navigate } = useNavigation()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const [visible, setVisible] = useState(false)

  const handleLogout = () => {}

  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 32,
          paddingBottom: 40,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <Pressable>
          <View className="flex flex-col space-y-16">
            <View className="flex justify-center items-center">
              <EditableProfileIcon
                profile_link={tmpUser.link_icon}
                setModalVisible={setVisible}
              />
              <TouchableOpacity
                className="mt-4"
                onPress={() => setVisible(!visible)}
                activeOpacity={0.6}
              >
                <LatoText classname={`text-secondary font-lato-bold`}>
                  Change picture
                </LatoText>
              </TouchableOpacity>
            </View>

            <View>
              <InputBlueBg
                title="Full name"
                userInfo={tmpUser.fullName}
                variant={Type.filled}
                placeholder="Not added"
              >
                <SmButton
                  text={"Change"}
                  onPress={() =>
                    navigate("Settings", {
                      screen: "EditName",
                    })
                  }
                />
              </InputBlueBg>
            </View>

            <View>
              <InputBlueBg
                title="Gender"
                userInfo={tmpUser.gender}
                variant={Type.filled}
                placeholder="Not added"
              >
                <SmButton
                  text={tmpUser.gender ? "Change" : "Add"}
                  onPress={() => navigate("Settings", { screen: "AddGender" })}
                  variation={tmpUser.gender ? Type.outlined : Type.filled}
                />
              </InputBlueBg>
            </View>

            <View>
              <InputBlueBg
                title="Mobile number"
                userInfo={tmpUser.phone}
                variant={Type.filled}
                placeholder="Not added"
              >
                <SmButton
                  text={"Change"}
                  onPress={() => navigate("Settings", { screen: "EditPhone" })}
                />
              </InputBlueBg>
            </View>

            <View>
              <InputBlueBg
                title="Email address"
                userInfo={tmpUser.email}
                variant={Type.filled}
                placeholder="Not added"
              >
                <SmButton
                  text={tmpUser.email ? "Change" : "Add"}
                  onPress={() => navigate("Settings", { screen: "AddEmail" })}
                  variation={tmpUser.email ? Type.outlined : Type.filled}
                />
              </InputBlueBg>
            </View>

            <View>
              <InputBlueBg
                title="Password"
                userInfo={"*".repeat(tmpUser.pswLength)}
                variant={Type.filled}
                placeholder="Not added"
              >
                <SmButton
                  text={"Change"}
                  // TODO: VerifyCode for changePassword endpoint is not ready, temporarily skip this step and navigate to ChangePassword screen
                  onPress={() =>
                    navigate("Settings", { screen: "ChangePassword" })
                  }
                />
              </InputBlueBg>
            </View>

            <View>
              <OutlinedButton
                text={"Log out"}
                onPress={handleLogout}
                colorTheme="red"
              />
            </View>

            <View className="w-full flex justify-center items-center absolute bottom-[180px] ">
              {tmpUser.message && <PopupMessage />}
            </View>
          </View>

          <ChangeProfileModal stateController={[visible, setVisible]} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AccountInfoIndex
