// REFERENCE: Setting - Personal - Logout

import SettingsNav from "components/SettingsNav"
import { View } from "react-native"
import FlatButton from "components/styled_components/FlatButton"
import { settingsNavData } from "constants/SettingsNavData"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import Fetcher from "utils/Fetcher"
import { TSignOut } from "types/endpoints"
import { authEP } from "constants/Endpoint"
import { useNavigation } from "@react-navigation/native"
import { tokenAction } from "redux/reducers/tokens.reducer"
import SettingsScreenLayout from "components/styled_components/SettingsScreenLayout"

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
      const resp = await Fetcher.init<TSignOut>("POST", authEP.SIGN_OUT)
        .withJsonPaylad({ token: token.currentToken })
        .withCurrentToken()
        .fetchData()

      console.log("sign out resp", resp)

      if (typeof resp === "undefined") {
        return
      }

      dispatch(tokenAction.clearToken())
      navigate("Auth", { screen: "FirstLanding" })
    })()
  }

  return (
    <SettingsScreenLayout>
      <View>
        {settingsNavData.map((section, index) => {
          return (
            <SettingsNav
              key={index}
              title={section.title}
              data={section.items}
            />
          )
        })}
      </View>
      <View className="flex flex-col space-y-4">
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
            bgColor="bg-bgText"
          />
        </View>
      </View>
    </SettingsScreenLayout>
  )
}

export default SettingsIndex
