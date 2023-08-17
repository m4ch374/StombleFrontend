import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackList } from "../types/Navigation"
import AuthStackNav from "./AuthStackNav"
import LoginRootTab from "./login_root/LoginRootTab"
import SettingsStackNav from "./SettingStack"

const RootStack = createNativeStackNavigator<RootStackList>()

export default function Navigation() {
  return (
    <RootStack.Navigator
      initialRouteName="Auth"
      screenOptions={{ headerShown: false }}
    >
      {/* TODO: implement auth logic */}
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
  )
}
