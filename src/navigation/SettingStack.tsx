import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AccountInfo from "screens/settings/AccountInfo"
import SettingsIndex from "screens/settings/SettingsIndex"
import { SettingStackList } from "types/Navigation"

const SettingsStack = createNativeStackNavigator<SettingStackList>()

const SettingsStackNav: React.FC = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerTintColor: "#FFFFFF",
        headerStyle: { backgroundColor: "#05051F" },
      }}
      initialRouteName="SettingsIndex"
    >
      <SettingsStack.Screen
        name="SettingsIndex"
        component={SettingsIndex}
        options={{ title: "Settings" }}
      />

      <SettingsStack.Screen
        name="AccountInfo"
        component={AccountInfo}
        options={{ title: "Account Information" }}
      />
    </SettingsStack.Navigator>
  )
}

export default SettingsStackNav
