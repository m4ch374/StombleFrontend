
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react';
import { AuthStackList } from './Navigation.interface'
import LandingWithAccount from '../screens/stack/login/LandingWithAccount'
import FirstLanding from '../screens/stack/login/FirstLanding'
import SignUpBusiness from '../screens/stack/register/SignUpBusiness'
import LoginWithPhone from '../screens/stack/login/LoginWithPhone'
import LoginWithPassword from '../screens/stack/login/LoginWithPassword'
import VerifyCode from '../screens/stack/password/VerifyCode'
import ChooseAccountType from '../screens/stack/register/ChooseAccountType'
import ForgetPassword from '../screens/stack/password/ForgetPassword'
import ResetPassword from '../screens/stack/password/ResetPassword'
import SetUpPassword from '../screens/stack/password/SetUpPassword'
import Home from '../screens/tab/homeTab/HomeTab'
import LeftHeader from '../style/LeftHeader'
import VerifyPhone from '../screens/stack/login/VerifyPhone'
import SignUpName from '../screens/stack/register/SignUpName'
import SignUpDOB from '../screens/stack/register/SignUpDOB'
import SignUpGender from '../screens/stack/register/SignUpGender'
import VerifyPassword from '../screens/stack/password/VerifyPassword';
import HomeTab from '../screens/tab/homeTab/HomeTab';
import Setting from '../screens/tab/settingTab/Setting';
import SaveLoginInfor from '../screens/stack/login/SaveLoginInfor';


const AuthStack = createNativeStackNavigator<AuthStackList>()

const AuthStackNavigator = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isFirstLaunch, setIsFirstLaunch] = useState<any>(true)

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
        setLoading(false)
      }
    })
  }, [])

  if (isFirstLaunch === null) {
    return null
  }

  if (isFirstLaunch === true) {
    return (
      <AuthStack.Navigator
        screenOptions={{
          headerTintColor: '#FFFFFF',
          headerStyle: { backgroundColor: '#020235' },
        }}
        initialRouteName={'FirstLanding'}
      >
        <AuthStack.Screen
          name='FirstLanding'
          component={FirstLanding}
          options={{ headerShown: false }}
        />

        {/* <AuthStack.Screen name='LoginWithPhone' component={LoginWithPhone} /> */}

        <AuthStack.Screen
        
          name='LandingWithAccount'
          component={LandingWithAccount}
          options = {{ headerShown: false }}
        />
        <AuthStack.Screen
          name='ChooseAccountType'
          component={ChooseAccountType}
        />
        <AuthStack.Screen
          name='SignUp'
          component={VerifyCode}
          options={{
            title: 'Sign Up',
            headerTitleAlign: 'center',
            headerLeft: () => <LeftHeader />,
          }}
        />
        <AuthStack.Screen name='SignUpBusiness' component={SignUpBusiness} />
        <AuthStack.Screen name='LoginWithPhone' component={LoginWithPhone} />
        <AuthStack.Screen
          name='LoginWithPassword'
          component={LoginWithPassword}
          options={{ headerTransparent: true }}
        />
        <AuthStack.Screen name='VerifyCode' component={VerifyPhone} />
        <AuthStack.Screen name='ForgetPassword' component={ForgetPassword} />
        <AuthStack.Screen name='ResetPassword' component={ResetPassword} />
        <AuthStack.Screen name='SetUpPassword' component={SetUpPassword} />
        <AuthStack.Screen name='HomeScreen' component={Home} />
        <AuthStack.Screen name='VerifyPassword' component={VerifyPassword} />
        <AuthStack.Screen name='Setting' component={Setting} />
        <AuthStack.Screen name='SaveLoginInfor' component={SaveLoginInfor} />

        

      </AuthStack.Navigator>
    )
  } else {
    return (
      <AuthStack.Navigator
        screenOptions={{
          headerTintColor: '#FFFFFF',
          headerStyle: { backgroundColor: '#020235' },
        }}
        // initialRouteName={"VerifyEmail"}
      >
        <AuthStack.Screen
          name='LoginWithPassword'
          component={LoginWithPassword}
          options={{ title: 'Log In' }}
        />

        <AuthStack.Screen
          name='FirstLanding'
          component={FirstLanding}
          options={{ headerShown: false }}
        />
        
        {/* <AuthStack.Screen name='LoginWithPhone' component={LoginWithPhone} /> */}

        <AuthStack.Screen
          name='LandingWithAccount'
          component={LandingWithAccount}
        />
        <AuthStack.Screen
          name='ChooseAccountType'
          component={ChooseAccountType}
        />
        <AuthStack.Screen
          name='SignUp'
          component={VerifyPhone}
          options={{
            title: 'Sign Up',
            headerTitleAlign: 'center',
            headerLeft: () => <LeftHeader />,
          }}
        />
        <AuthStack.Screen
          name='SignUpName'
          component={SignUpName}
          options={{
            title: 'Sign Up',
            headerTitleAlign: 'center',
            headerLeft: () => <LeftHeader />,
          }}
        />
        <AuthStack.Screen
          name='SignUpDOB'
          component={SignUpDOB}
          options={{
            title: 'Sign Up',
            headerTitleAlign: 'center',
            headerLeft: () => <LeftHeader />,
          }}
        />
        <AuthStack.Screen
          name='SignUpGender'
          component={SignUpGender}
          options={{
            title: 'Sign Up',
            headerTitleAlign: 'center',
            headerLeft: () => <LeftHeader />,
          }}
        />
        <AuthStack.Screen name='SignUpBusiness' component={SignUpBusiness} />
        <AuthStack.Screen
          name='LoginWithPhone'
          component={LoginWithPhone}
          options={{ title: 'Log In' }}
        />
        <AuthStack.Screen
          name='VerifyCode'
          component={VerifyCode}
          options={{
            title: 'Verify Code',
            headerLeft: () => <LeftHeader />,
            headerTitleAlign: 'center',
          }}
        />
        <AuthStack.Screen name='ResetPassword' component={ResetPassword} />
        <AuthStack.Screen name='ForgetPassword' component={ForgetPassword} />
        <AuthStack.Screen name='SetUpPassword' component={SetUpPassword} />
        <AuthStack.Screen name='VerifyPassword' component={VerifyPassword} />
        <AuthStack.Screen name='Setting' component={Setting} />
        <AuthStack.Screen name='SaveLoginInfor' component={SaveLoginInfor} />
        { <AuthStack.Screen name='HomeScreen' component={Home} /> }
      </AuthStack.Navigator>
    )
  }
}
export default AuthStackNavigator