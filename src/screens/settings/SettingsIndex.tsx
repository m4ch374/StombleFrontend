// REFERENCE: Setting - Personal

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

  // /sign-out not working
  const handleLogout = () => {
    ;(async () => {
      const resp = await Fetcher.init<TSignOut>("POST", authEP.SIGN_OUT)
        .withJsonPaylad({ token: token.currentToken })
        .fetchData()

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
