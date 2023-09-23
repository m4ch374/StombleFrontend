import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CustomColor from "constants/Colors"
import AccountInfoIndex from "screens/settings/AccountInfo/AccountInfoIndex"
import AddEmail from "screens/settings/AccountInfo/AddEmail"
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
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { TouchableWithoutFeedback } from "react-native"
import ChangePassword from "screens/settings/AccountInfo/ChangePassword"
import ReasonsOfLeave from "screens/settings/CloseAccount/ReasonsOfLeave"
import ConfirmOfLeave from "screens/settings/CloseAccount/ConfirmOfLeave"
import VerifyCodeForLeave from "screens/settings/CloseAccount/VerifyCodeForLeave"
import AddGender from "screens/settings/AccountInfo/AddGender"

const SettingsStack = createNativeStackNavigator<SettingsMenuList>()
const AccountInfoStack = createNativeStackNavigator<AccountInfoList>()

const SettingsStackNav: React.FC = () => {
  const navigate = useNavigation()
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerTintColor: CustomColor.white,
        headerStyle: { backgroundColor: CustomColor.background },
        headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
        headerBackTitleVisible: false,
      }}
      initialRouteName="SettingsIndex"
    >
      <SettingsStack.Screen
        name="SettingsIndex"
        component={SettingsIndex}
        options={{
          title: "Settings",
          headerLeft: () => (
            <TouchableWithoutFeedback onPress={() => navigate.goBack()}>
              <MaterialIcons name="arrow-back-ios" size={24} color="white" />
            </TouchableWithoutFeedback>
          ),
        }}
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
          options={{ title: "Change name" }}
        />

        <AccountInfoStack.Screen
          name="AddGender"
          component={AddGender}
          options={{ title: "Add gender" }}
        />

        <AccountInfoStack.Screen
          name="EditPhone"
          component={EditPhone}
          options={{ title: "Change mobile number" }}
        />

        <AccountInfoStack.Screen
          name="VerifyCodeForUpdate"
          component={VerifyCodeForUpdate}
          options={{ title: "Verify code" }}
        />

        <AccountInfoStack.Screen
          name="AddEmail"
          component={AddEmail}
          options={{ title: "Add email address" }}
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

      {/* Close Account Group */}
      <SettingsStack.Group
        screenOptions={{
          headerBackTitle: "Back",
          title: "Close Account",
        }}
      >
        <SettingsStack.Screen
          name="ReasonsOfLeave"
          component={ReasonsOfLeave}
        />
        <SettingsStack.Screen
          name="ConfirmOfLeave"
          component={ConfirmOfLeave}
        />
        <SettingsStack.Screen
          name="VerifyCodeForLeave"
          component={VerifyCodeForLeave}
        />
      </SettingsStack.Group>
    </SettingsStack.Navigator>
  )
}

export default SettingsStackNav
