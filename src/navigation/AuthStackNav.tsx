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
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"

const AuthStack = createNativeStackNavigator<AuthStackList>()

const AuthStackNav = () => {
  const { navigate } = useNavigation()

  useEffect(() => {
    // Check if a token exists in AsyncStorage
    // AsyncStorage.getItem("token").then(token => {
    //   if (token) {
    //     // Token exists, navigate to the home screen
    //     navigate("LoginRoot", { screen: "Home" })
    //   }
    // })
    // Check for the token in AsyncStorage
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token") // Replace with your actual token key
        if (token) {
          // Token exists, navigate to the home screen
          navigate("LoginRoot", { screen: "Home" }) // Replace with your actual home screen name
        }
      } catch (error) {
        console.error("Error checking token:", error)
      }
    }

    void checkToken() // Mark the promise as ignored
  }, [navigate])
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
