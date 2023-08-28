// Code copied from shadow realm

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FirstLanding from "screens/authentication/FirstLanding"
import { AuthStackList } from "types/Navigation"
import SignUpName from "screens/authentication/SignUp/SignUpName"
import SignUpDOB from "screens/authentication/SignUp/SignUpDOB"
import ForgetPassword from "screens/authentication/SignIn/ForgetPassword"
import ChooseAccountType from "screens/authentication/SignUp/ChooseAccountType"
import VerifyPhone from "screens/authentication/SignUp/VerifyPhone"
import SignUpGender from "screens/authentication/SignUp/SignUpGender"
import SetUpPassword from "screens/authentication/SignUp/SetUpPassword"
import SignupBusinessName from "screens/authentication/SignUp/SignUpBusinessName"
import LoginWithAccount from "screens/authentication/SignIn/LoginWithAccount"
import VerifyCode from "screens/authentication/SignIn/VerifyCode"
import Login from "screens/authentication/SignIn/Login"
import ReasonsOfLeave from "screens/authentication/CloseAccount/ReasonsOfLeave"
import ConfirmOfLeave from "screens/authentication/CloseAccount/ConfirmOfLeave"
import VerifyCodeForLeave from "screens/authentication/CloseAccount/VerifyCodeForLeave"

const AuthStack = createNativeStackNavigator<AuthStackList>()

const AuthStackNav = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerTintColor: "#FFFFFF",
        headerStyle: { backgroundColor: "#020235" },
      }}
      initialRouteName="FirstLanding"
    >
      <AuthStack.Screen
        name="FirstLanding"
        component={FirstLanding}
        options={{ headerShown: false }}
      />

      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ title: "Log in" }}
      />

      <AuthStack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ title: "Forget Password" }}
      />

      <AuthStack.Screen
        name="VerifyCode"
        component={VerifyCode}
        options={{ title: "Verify Code" }}
      />
      {/* Sign up Group */}
      <AuthStack.Group screenOptions={{ title: "Sign Up" }}>
        <AuthStack.Screen name="VerifyPhone" component={VerifyPhone} />

        <AuthStack.Screen name="SignUpName" component={SignUpName} />

        <AuthStack.Screen name="SignUpDOB" component={SignUpDOB} />

        <AuthStack.Screen name="SignUpGender" component={SignUpGender} />
        <AuthStack.Screen
          name="ChooseAccountType"
          component={ChooseAccountType}
        />

        <AuthStack.Screen name="SetUpPassword" component={SetUpPassword} />

        <AuthStack.Screen
          name="SignUpBusinessName"
          component={SignupBusinessName}
        />
      </AuthStack.Group>

      <AuthStack.Screen name="LoginWithAccount" component={LoginWithAccount} />

      {/* Close Account Group */}
      <AuthStack.Group
        screenOptions={{
          headerBackTitle: "Back",
          headerBackTitleVisible: false,
          title: "Close Account",
          headerStyle: { backgroundColor: "#020235" },
        }}
      >
        <AuthStack.Screen name="ReasonsOfLeave" component={ReasonsOfLeave} />
        <AuthStack.Screen name="ConfirmOfLeave" component={ConfirmOfLeave} />
        <AuthStack.Screen
          name="VerifyCodeForLeave"
          component={VerifyCodeForLeave}
        />
      </AuthStack.Group>
    </AuthStack.Navigator>
  )
}

export default AuthStackNav

// Forgor why i needed this
// Prolly legacy stuff from shadow realm
export { AuthStack }
