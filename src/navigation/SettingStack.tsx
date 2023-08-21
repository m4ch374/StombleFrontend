import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AccountInfo from "screens/settings/AccountInfo"
import AddEmail from "screens/settings/AddEmail"
import EditName from "screens/settings/EditName"
import EditPhone from "screens/settings/EditPhone"
import SettingsIndex from "screens/settings/SettingsIndex"
import { SettingStackList } from "types/Navigation"

const SettingsStack = createNativeStackNavigator<SettingStackList>()

const SettingsStackNav: React.FC = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerTintColor: "#FFFFFF",
        headerStyle: { backgroundColor: "#080816" },
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

      <SettingsStack.Group>
        <SettingsStack.Screen
          name="EditName"
          component={EditName}
          options={{ title: "Edit Name" }}
        />

        <SettingsStack.Screen
          name="EditPhone"
          component={EditPhone}
          options={{ title: "Edit Phone" }}
        />

        <SettingsStack.Screen
          name="AddEmail"
          component={AddEmail}
          options={{ title: "Add Email" }}
        />
      </SettingsStack.Group>
    </SettingsStack.Navigator>
  )
}

export default SettingsStackNav
