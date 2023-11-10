// REFERENCE: Setting - Personal - Logout

import SettingsNav from "components/settings/SettingsNav"
import { View } from "react-native"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { useNavigation } from "@react-navigation/native"
import { tokenAction } from "redux/reducers/tokens.reducer"
import { settingsMenuItems } from "constants/SettingsMenuItems"
import OutlinedButton from "components/settings/OutlinedButton"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import { useCallback } from "react"
import { signOut } from "utils/services/auth"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"

const SettingsIndex: React.FC = () => {
  const token = useAppSlector(state => state.tokens.currentToken)
  const navigate = useNavigation()
  const dispatch = useAppDispatch()

  // TODO: Become a Business
  const handleBecomeBusiness = () => {}

  const waitForTokenClear = useCallback(
    () =>
      new Promise<void>(resolve => {
        dispatch(tokenAction.clearToken())
        resolve()
      }),
    [dispatch],
  )

  // TODO: logout workflow
  const handleLogout = () => {
    // fake logout
    ;(async () => {
      await signOut({ token })
      dispatch(
        tmpStoreAction.setState(state => {
          state.isLogged = false
          return state
        }),
      )

      // if (typeof resp === "undefined") return

      await waitForTokenClear()
      navigate.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      })
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
