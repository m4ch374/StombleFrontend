import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CustomColor from "constants/Colors"
import AccountInfoIndex from "screens/settings/AccountInfo/AccountInfoIndex"
import AddEmail from "screens/settings/AccountInfo/AddEmail"
import ChangePassword from "screens/settings/AccountInfo/ChangePassword"
import EditName from "screens/settings/AccountInfo/EditName"
import EditPhone from "screens/settings/AccountInfo/EditPhone"
import TakePhoto from "screens/settings/AccountInfo/TakePhoto"
import VerifyCodeForUpdate from "screens/settings/AccountInfo/VerifyCodeForUpdate"
import ContactUs from "screens/settings/ContactUs"
import ManageProfiles from "screens/settings/ManageProfiles"
import NotificationSettings from "screens/settings/NotificationSettings"
import Security from "screens/settings/Security"
import SettingsIndex from "screens/settings/SettingsIndex"
import { AccountInfoList, SettingsMenuList } from "types/Navigation"
import TermsConditions from "_shadow_realm/screens/stack/commonStacks/TermsConditions"

const SettingsStack = createNativeStackNavigator<SettingsMenuList>()
const AccountInfoStack = createNativeStackNavigator<AccountInfoList>()

const SettingsStackNav: React.FC = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerTintColor: CustomColor.white,
        headerStyle: { backgroundColor: CustomColor.background },
      }}
      initialRouteName="SettingsIndex"
    >
      <SettingsStack.Screen
        name="SettingsIndex"
        component={SettingsIndex}
        options={{ title: "Settings" }}
      />

      <SettingsStack.Screen
        name="AccountInfoIndex"
        component={AccountInfoIndex}
        options={{ title: "Account Information" }}
      />

      {/* Edit Account Information Group */}
      <AccountInfoStack.Group>
        <AccountInfoStack.Screen
          name="EditName"
          component={EditName}
          options={{ title: "Edit Name" }}
        />

        <AccountInfoStack.Screen
          name="EditPhone"
          component={EditPhone}
          options={{ title: "Edit Phone" }}
        />

        <AccountInfoStack.Screen
          name="VerifyCodeForUpdate"
          component={VerifyCodeForUpdate}
          options={{ title: "Verify code" }}
        />

        <AccountInfoStack.Screen
          name="AddEmail"
          component={AddEmail}
          options={{ title: "Add Email" }}
        />

        <AccountInfoStack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ title: "Change password" }}
        />

        <AccountInfoStack.Screen
          name="TakePhoto"
          component={TakePhoto}
          options={{ headerShown: false }}
        />
      </AccountInfoStack.Group>

      <SettingsStack.Screen
        name="ManageProfiles"
        component={ManageProfiles}
        options={{ title: "Manage Profiles" }}
      />

      <SettingsStack.Screen
        name="Security"
        component={Security}
        options={{ title: "Security" }}
      />

      <SettingsStack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
        options={{ title: "Notifications" }}
      />

      <SettingsStack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ title: "ContactUs" }}
      />

      <SettingsStack.Screen
        name="TermsNConditions"
        component={TermsConditions}
        options={{ title: "Terms and Conditions" }}
      />
    </SettingsStack.Navigator>
  )
}

export default SettingsStackNav
