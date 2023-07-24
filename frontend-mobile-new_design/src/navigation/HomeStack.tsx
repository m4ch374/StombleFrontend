import {AntDesign} from '@expo/vector-icons';
import {useNavigationState} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useTheme } from 'native-base';
import React, { useState, useEffect } from 'react';
import Home from '../screens/tab/homeTab/HomeTab';
import SignUp from '../screens/stack/register/SignUp';
import PersonalInfo from '../screens/stack/commonStacks/PersonalInfo';
import SignUpBusiness from '../screens/stack/register/SignUpBusiness';
import LoginWithPhone from '../screens/stack/login/LoginWithPhone';
import VerifyCode from '../screens/stack/password/VerifyCode';
import LoginWithPassword from '../screens/stack/login/LoginWithPassword';
import SetUpPassword from '../screens/stack/password/SetUpPassword';
import ResetPassword from '../screens/stack/password/ResetPassword';
import ForgetPassword from '../screens/stack/password/ForgetPassword';
import ComingSoon from '../screens/comingSoon/ComingSoon';
import { HomeStackList } from './Navigation.interface';
import VerifyPassword from '../screens/stack/password/VerifyPassword';
import Setting from '../screens/tab/settingTab/Setting';
import SaveLoginInfor from '../screens/stack/login/SaveLoginInfor';
import SignupBusinessName from '../screens/stack/register/SignupBusinessName';
import ManageProfile from '../screens/stack/user/ManageProfile';
import RemoveProfile from '../screens/stack/user/RemoveProfile';
import Professional from '../screens/Professional/Professional';
import Search from '../screens/tab/searchTab/Search';
import AccountManagement from '../screens/stack/commonStacks/AccountManagement';
import EditName from '../screens/stack/commonStacks/EditName';


const HomeStack = createNativeStackNavigator<HomeStackList>();
interface Props {
  navigation: any;
}
const HomeStackNavigator = ({navigation}: Props) => {
 

  return (
    <HomeStack.Navigator initialRouteName='HomeScreen'>
      <HomeStack.Screen
        name='HomeScreen'
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <HomeStack.Screen
        name='PersonalInfo'
        component={PersonalInfo}
        options={{
          headerTitle: 'Profile',
        }}
      />
      <HomeStack.Screen name='SignUp' component={SignUp} />
      <HomeStack.Screen name='SignUpBusiness' component={SignUpBusiness} />
      <HomeStack.Screen name='LoginWithPhone' component={LoginWithPhone} />
      <HomeStack.Screen
        name='LoginWithPassword'
        component={LoginWithPassword}
      />
      <HomeStack.Screen name='VerifyCode' component={VerifyCode} />
      <HomeStack.Screen name='ForgetPassword' component={ForgetPassword} />
      <HomeStack.Screen name='ResetPassword' component={ResetPassword} />
      <HomeStack.Screen name='SetUpPassword' component={SetUpPassword} />
      <HomeStack.Screen name='VerifyPassword' component={VerifyPassword} />
      <HomeStack.Screen name='SaveLoginInfor' component={SaveLoginInfor} />
      <HomeStack.Screen name='Setting' component={Setting} />
      <HomeStack.Screen name='ManageProfile' component={ManageProfile}/>
      <HomeStack.Screen name='RemoveProfile' component={RemoveProfile}/>
      <HomeStack.Screen name='SignupBusinessName' component={SignupBusinessName}/>
      <HomeStack.Screen name='Professional' component={Professional} />
      <HomeStack.Screen name='Search' component={Search} />
      <HomeStack.Screen name='AccountManagement' component={AccountManagement} />
      <HomeStack.Screen name='EditName' component={EditName} />
      <HomeStack.Screen
        name='ComingSoon'
        component={ComingSoon}
      />
    </HomeStack.Navigator>
  );
};
export default HomeStackNavigator;
