// REFERENCE: Setting - Personal - Logout

import SettingsNav from "components/settings/SettingsNav"
import { View } from "react-native"
import FlatButton from "components/styled_components/FlatButton"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { useNavigation } from "@react-navigation/native"
import { tokenAction } from "redux/reducers/tokens.reducer"
import SettingsScreenLayout from "components/settings/SettingsScreenLayout"
import { settingsMenuItems } from "constants/SettingsMenuItems"
import { signOut } from "utils/services/auth"

const SettingsIndex: React.FC = () => {
  const { navigate } = useNavigation()
  const dispatch = useAppDispatch()
  const token = useAppSlector(state => state.tokens)

  // TODO: Become a Business
  const handleBecomeBusiness = () => {}

  // TODO: logout from an active account
  // ----------------------------------------------------------------
  // logout workflow:
  // 1. When log out, save info screen pops up if he hasn’t saved the login info earlier.
  // 2. If user has multiple accounts, after logging out it returns back to this screen
  //    If user has single account, after logging out it returns back to this screen
  //----------------------------------------------------------------
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
    <SettingsScreenLayout>
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
      <View className="flex flex-col space-y-sm">
        <View>
          <FlatButton
            text={"Become a Business"}
            onPress={handleBecomeBusiness}
            variation="outlined"
          />
        </View>
        <View>
          <FlatButton
            text={"Log Out"}
            onPress={handleLogout}
            bgColor="bg-navbar"
          />
        </View>
      </View>
    </SettingsScreenLayout>
  )
}

export default SettingsIndex
