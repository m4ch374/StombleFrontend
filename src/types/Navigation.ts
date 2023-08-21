/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

// Ok.... here we go.... here comes the refactor bomb... --Henry

// Code copied elsewhere
import { NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

// Default types for useNavigation, link, ref
// Refer to react navigation
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackList {}
  }
}

export type RootStackList = {
  Auth: NavigatorScreenParams<AuthStackList>
  LoginRoot: NavigatorScreenParams<LoginRootTabList>
  Settings: NavigatorScreenParams<SettingStackList>
}

export type RootStackScreenProps<Screen extends keyof RootStackList> =
  NativeStackScreenProps<RootStackList, Screen>

// I am thinking about moving these to it's corresponding file

// ===============================================
// Authentication
// ===============================================
export type AuthStackList = {
  FirstLanding: undefined

  Login: undefined

  ForgetPassword: undefined

  VerifyPhone: undefined
  VerifyCode: undefined

  SignUpName: undefined
  SignUpBusinessName: undefined

  SignUpDOB: undefined
  SignUpGender: undefined
  ChooseAccount: undefined
  LoginWithAccount: undefined
  ChooseAccountType: undefined

  SetUpPassword: undefined
}
// ===============================================

// ===============================================
// Root after login
// ===============================================
export type LoginRootTabList = {
  Home: undefined
  Search: undefined
  Notification: undefined
  Profile: undefined // No props for profile yet
}
// ===============================================

// ===============================================
// Settings
// ===============================================
export type SettingStackList = {
  SettingsIndex: undefined

  AccountInfo: undefined
  EditName: undefined
  EditPhone: undefined
  AddEmail: undefined

  ManageProfiles: undefined
  Security: undefined
  Notifications: undefined
  ContactUs: undefined
  TermsNConditions: undefined
}
// ===============================================
