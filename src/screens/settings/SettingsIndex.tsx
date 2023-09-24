// REFERENCE: Setting - Personal - Logout

import SettingsNav from "components/settings/SettingsNav"
import { View } from "react-native"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { useNavigation } from "@react-navigation/native"
import { tokenAction } from "redux/reducers/tokens.reducer"
import { settingsMenuItems } from "constants/SettingsMenuItems"
import { signOut } from "utils/services/auth"
import OutlinedButton from "components/settings/OutlinedButton"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"

const SettingsIndex: React.FC = () => {
  const { navigate } = useNavigation()
  const dispatch = useAppDispatch()
  const token = useAppSlector(state => state.tokens)

  // TODO: Become a Business
  const handleBecomeBusiness = () => {}

  // TODO: logout workflow
  const handleLogout = () => {
    // endpoint: simple log out directly
    ;(async () => {
      const resp = await signOut({ token: token.currentToken })

      if (typeof resp === "undefined") return

      dispatch(tokenAction.clearToken())
      navigate("Auth", { screen: "FirstLanding" })
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
