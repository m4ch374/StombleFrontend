import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackList } from "../types/Navigation"
import AuthStackNav from "./AuthStackNav"
import LoginRootTab from "./login_root/LoginRootTab"
import SettingsStackNav from "./SettingStackNav"
import { useAppSlector } from "redux/hooks"
import { View } from "react-native"
import { StatusBar } from "expo-status-bar"

const RootStack = createNativeStackNavigator<RootStackList>()

export default function Navigation() {
  const token = useAppSlector(state => state.tokens.currentToken)
  const isLogged = useAppSlector(state => state.tmpStore.isLogged)

  return (
    <View className="h-full bg-background">
      <StatusBar style="light" />
      <RootStack.Navigator
        initialRouteName={token.length && isLogged ? "LoginRoot" : "Auth"}
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen
          component={AuthStackNav}
          name="Auth"
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name="LoginRoot"
          component={LoginRootTab}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name="Settings"
          component={SettingsStackNav}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </View>
  )
}
