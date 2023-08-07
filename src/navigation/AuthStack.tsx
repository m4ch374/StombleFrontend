// Code copied from shadow realm

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FirstLanding from "../screens/authentication/FirstLanding"
import { AuthStackList } from "../types/Navigation"
import SignUpName from "../screens/authentication/SignUp/SignUpName"
import SignUpDOB from "../screens/authentication/SignUp/SignUpDOB"
import Login from "../screens/authentication/Login"
import ForgetPassword from "../screens/authentication/ForgetPassword"
import VerifyCode from "../screens/authentication/VerifyCode"
import ChooseAccountType from "../screens/authentication/SignUp/ChooseAccountType"
import VerifyPhone from "../screens/authentication/SignUp/VerifyPhone"
import LoginWithAccount from "../screens/authentication/LoginWithAccount"
import SignUpGender from "../screens/authentication/SignUp/SignUpGender"

const AuthStack = createNativeStackNavigator<AuthStackList>()

const AuthStackNavigator = () => {
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
        <AuthStack.Screen name="VerifyPhone" 
        component={VerifyPhone} />

        <AuthStack.Screen name="SignUpName" 
        component={SignUpName} />

        <AuthStack.Screen name="SignUpDOB" 
        component={SignUpDOB} />

        <AuthStack.Screen
          name="SignUpGender"
          component={SignUpGender}
        />

        <AuthStack.Screen
          name="ChooseAccountType"
          component={ChooseAccountType}
        />
      </AuthStack.Group>

      <AuthStack.Screen name="LoginWithAccount" component={LoginWithAccount} />
    </AuthStack.Navigator>
  )
}

export default AuthStackNavigator
export { AuthStack }
