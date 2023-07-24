import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react'
import { ProfileStackList } from './Navigation.interface';
import Profile from '../screens/tab/userTab/Profile';
import UserTabs from './UserTabs';
import Notifications from '../screens/stack/commonStacks/Notifications';
import Setting from '../screens/tab/settingTab/Setting';
import SaveLoginInfor from '../screens/stack/login/SaveLoginInfor';
import ManageProfile from '../screens/stack/user/ManageProfile';
import RemoveProfile from '../screens/stack/user/RemoveProfile';
import Professional from '../screens/Professional/Professional';
import AccountManagement from '../screens/stack/commonStacks/AccountManagement';
import EditName from '../screens/stack/commonStacks/EditName';

const profileStack=createNativeStackNavigator<ProfileStackList>()


const ProfileStack = () => {
  return (
    <profileStack.Navigator>
        <profileStack.Screen name='Profile' component={Profile} options={{headerShown:false}} />
        <profileStack.Screen name='TopTabs' component={UserTabs}/>
        <profileStack.Screen name='Notice' component={Notifications}/>
        <profileStack.Screen name='Settings' component={Setting}/>
        <profileStack.Screen name='ManageProfile' component={ManageProfile}/>
        <profileStack.Screen name='RemoveProfile' component={RemoveProfile}/>
        <profileStack.Screen name='SaveLoginInfor' component={SaveLoginInfor}/>
        <profileStack.Screen name='Professional' component={Professional}/>
        <profileStack.Screen name='AccountManagement' component={AccountManagement}/>
        <profileStack.Screen name='EditName' component={EditName} />

    </profileStack.Navigator>
  )
}

export default ProfileStack
