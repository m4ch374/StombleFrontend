// Code copied from shadow realm

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FirstLanding from '../screens/authentication/FirstLanding'
import { AuthStackList } from '../types/Navigation'
import VerifyPhone from '../screens/authentication/SignUp/VerifyPhone'
import SignUpName from '../screens/authentication/SignUp/SignUpName'
import SignUpDOB from '../screens/authentication/SignUp/SignUpDOB'
import ChooseAccountType from '../screens/authentication/SignUp/ChooseAccountType'

const AuthStack = createNativeStackNavigator<AuthStackList>()

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerTintColor: '#FFFFFF',
        headerStyle: { backgroundColor: '#020235' },
      }}
      initialRouteName='FirstLanding'
    >
      <AuthStack.Screen
        name='FirstLanding'
        component={FirstLanding}
        options={{ headerShown: false }}
      />

      <AuthStack.Group
        screenOptions={{ title: "Sign Up" }}
      >
        <AuthStack.Screen 
          name="VerifyPhone"
          component={VerifyPhone}
        />

        <AuthStack.Screen 
          name="SignUpName"
          component={SignUpName}
        />

        <AuthStack.Screen 
          name="SignUpDOB"
          component={SignUpDOB}
        />

        <AuthStack.Screen 
          name="ChooseAccountType"
          component={ChooseAccountType}
        />

      </AuthStack.Group>
    </AuthStack.Navigator>
  )
}

export default AuthStackNavigator
export { AuthStack }
