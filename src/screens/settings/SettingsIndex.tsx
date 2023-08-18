// REFERENCE: Setting - Personal

import { SafeAreaView } from "react-native-safe-area-context"
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
    <SafeAreaView className=" bg-bgSetting flex-1 p-[16px] pt-[0] justify-between">
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
    </SafeAreaView>
  )
}

export default SettingsIndex
