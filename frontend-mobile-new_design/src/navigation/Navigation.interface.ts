/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  Auth: NavigatorScreenParams<AuthStackList>
  NotFound: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackList>
  Search: NavigatorScreenParams<SearchStackList>
  ProfileTab: NavigatorScreenParams<ProfileStackList>
  Professional: NavigatorScreenParams<ProfessionalStackList>
}

export type AuthStackList = {
  HomeScreen: undefined
  LandingWithAccount: undefined
  RemoveProfile: undefined
  EditName:undefined
  FirstLanding: undefined
  ManageProfile:undefined
  SignUp: undefined
  SignUpName: undefined
  SignUpDOB: undefined
  SignUpGender: undefined
  VerifyPhone: undefined
  LoginWithPassword: undefined
  LoginWithPhone: undefined
  VerifyCode: undefined
  LogoutModal : undefined
  VerifyPassword: undefined
  ChooseAccountType: undefined
  SignUpBusiness: undefined
  ForgetPassword: undefined
  ResetPassword: undefined
  SignupBusinessName : undefined
  AddSocialMediaModal:undefined
  Professional:undefined
  AccountManagement:undefined
  Search:undefined
  Setting:undefined
  
  SetUpPassword: {
    password?: string
    token?: string
  }
  AddAccountModal: undefined
  
  SaveLoginInfor: undefined
}

export type HomeStackList = {
  HomeScreen: undefined
  More: undefined
  Professional:undefined
  SignUp: undefined
  ManageProfile:undefined
  SignUpBusiness: undefined
  LoginWithPassword: undefined
  EditName:undefined
  LoginWithPhone: undefined
  PersonalInfo: undefined
  ComingSoon: undefined
  Search:undefined
  Setting:undefined
  RemoveProfile: undefined
  SaveLoginInfor: undefined
  SignupBusinessName : undefined
  AccountManagement: undefined
  VerifyCode: {
    email: string
  }
  VerifyPassword: {
    password: string
  }
  ForgetPassword: undefined
  ResetPassword: {
    username?: string
    token?: string
  }
  SetUpPassword: {
    password?: string
    token?: string
  }
}

export type ProfileStackList = 
{
  Profile: undefined
  AccountHome: undefined
  PersonalInfo: undefined
  AccountManagement: undefined
  UserFileSetting: undefined
  SettingButton:undefined
  RemoveProfile: undefined
  ManageProfile: undefined
  Professional:undefined
  EditName:undefined
  Search:undefined
  Follower: undefined
  Following: undefined
  Liked: undefined  
  History: undefined
  LogoutModal: undefined
  AddSocialMediaModal:undefined
  TopTabs: undefined
  Settings: undefined
  SaveLoginInfor:undefined
  Notice: undefined
  AddAccountModal: { setModalVisible: any }
  LoginWithPassword: undefined
  SignUpBusiness: undefined
}

export type SearchStackList = {
  SearchScreen: undefined
  Following: undefined
  Follower: undefined
}
export type ProfessionalStackList = {
  BusinessInfo: undefined
  Following: undefined
  Follower: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >
