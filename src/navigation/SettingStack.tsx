import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SettingsIndex from "screens/settings/SettingsIndex"
import { SettingStackList } from "types/Navigation"

const SettingsStack = createNativeStackNavigator<SettingStackList>()

const SettingsStackNav: React.FC = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerTintColor: "#FFFFFF",
        headerStyle: { backgroundColor: "#020235" },
      }}
    >
      <SettingsStack.Screen name="SettingsIndex" component={SettingsIndex} />
    </SettingsStack.Navigator>
  )
}

export default SettingsStackNav
