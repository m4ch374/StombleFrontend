// REFERENCE: Setting - Personal - Logout

import SettingsNav from "components/settings/SettingsNav"
import { View } from "react-native"
import { useAppDispatch } from "redux/hooks"
import { useNavigation } from "@react-navigation/native"
import { tokenAction } from "redux/reducers/tokens.reducer"
import { settingsMenuItems } from "constants/SettingsMenuItems"
import OutlinedButton from "components/settings/OutlinedButton"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"

const SettingsIndex: React.FC = () => {
  const navigate = useNavigation()
  const dispatch = useAppDispatch()

  // TODO: Become a Business
  const handleBecomeBusiness = () => {}

  // TODO: logout workflow
  const handleLogout = () => {
    // fake logout
    ;(async () => {
      // const resp = await signOut({ token: token.currentToken })

      // if (typeof resp === "undefined") return

      navigate.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      })
      dispatch(tokenAction.clearToken())
    })()
  }

  return (
    <GeneralScreenLayout>
      <View>
        {settingsMenuItems.map((section, index) => {
          return (
            <SettingsNav
              key={index}
              title={section.title}
              data={section.menuList}
            />
          )
        })}
      </View>
      <View className="flex flex-col space-y-md">
        <View>
          <OutlinedButton
            text={"Switch to Business Mode"}
            onPress={handleBecomeBusiness}
          />
        </View>
        <View>
          <OutlinedButton
            text={"Log Out"}
            onPress={handleLogout}
            colorTheme={"red"}
          />
        </View>
      </View>
    </GeneralScreenLayout>
  )
}

export default SettingsIndex
