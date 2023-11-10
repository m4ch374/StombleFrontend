/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

// Ok.... here we go.... here comes the refactor bomb... --Henry

// Code copied elsewhere
import { NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { BusinessAccountInformationItem } from "./endpoints"

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
  Settings: NavigatorScreenParams<SettingsMenuList & AccountInfoList>
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
  LoginWithAccount: {
    business?: BusinessAccountInformationItem[]
  }
  ChooseAccountType: undefined

  SetUpPassword: undefined

  FollowTopics: undefined
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
// Swipable Tab on profile
// ===============================================
export type ProfileTabList = {
  Following: undefined
  VideosLiked: undefined
  VideosSaved: undefined
}

// ===============================================

// ===============================================
// Settings
// ===============================================
export type SettingsMenuList = {
  SettingsIndex: undefined
  AccountInfoIndex: NavigatorScreenParams<AccountInfoList> | undefined
  ManageProfiles: undefined
  Security: undefined
  NotificationSettings: undefined
  ContactUs: undefined
  TermsNConditions: undefined

  // Close Account
  ReasonsOfLeave: undefined
  ConfirmOfLeave: undefined
  VerifyCodeForLeave: undefined
}
// ===============================================

// ===============================================
// Settings -> Account Information Editing screen list
// ===============================================
export type AccountInfoList = {
  EditName: undefined
  AddGender: undefined
  EditPhone: undefined
  VerifyCodeForUpdate: {
    phone?: string
    email?: string
  }
  AddEmail: undefined
  ChangePassword: undefined

  TakePhoto: undefined
}
