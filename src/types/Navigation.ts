/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

// Ok.... here we go.... here comes the refactor bomb... --Henry

// Code copied elsewhere
import { NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

declare global {
  // TODO: use ES2015 module syntax instead
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackList {}
  }
}

export type RootStackList = {
  Auth: NavigatorScreenParams<AuthStackList>
  LoginRoot: NavigatorScreenParams<LoginRootTabList>
  NotFound: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackList> =
  NativeStackScreenProps<RootStackList, Screen>

// ===============================================
// Authentication
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
}
// ===============================================

export type LoginRootTabList = {
  Home: undefined
}
