import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react'
import { ProfileStackList } from './Navigation.interface';
import Profile from '../screens/tab/userTab/Profile';
import UserTabs from './UserTabs';
import Notifications from '../screens/stack/commonStacks/Notifications';
import Setting from '../screens/tab/settingTab/Setting';

const profileStack=createNativeStackNavigator<ProfileStackList>()


const ProfileStack = () => {
  return (
    <profileStack.Navigator>
        <profileStack.Screen name='Profile' component={Profile} options={{headerShown:false}} />
        <profileStack.Screen name='TopTabs' component={UserTabs}/>
        <profileStack.Screen name='Notice' component={Notifications}/>
        <profileStack.Screen name='Settings' component={Setting}/>
    </profileStack.Navigator>
  )
}

export default ProfileStack
