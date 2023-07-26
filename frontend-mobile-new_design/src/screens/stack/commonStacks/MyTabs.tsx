import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Settings } from 'react-native';
import Home from '../../tab/homeTab/HomeTab';
import Setting from '../../tab/settingTab/Setting';
import Profile from '../../tab/userTab/Profile';
import BackgroundColor from '../../../style/BackgroundColor';
import { black } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import { View, Image } from 'react-native';

const Tab = createBottomTabNavigator();

const CustomIcon = ({color, size}) => (
    <View>
      <Image source={require('../../../../assets/ic_home.png')} style={{ width: 30, height: size }} />
    </View>
  );

  function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
                screenOptions={{
                tabBarActiveTintColor: '#e91e63',
                headerShown:false,
                tabBarStyle : {
                    backgroundColor : '#020235'
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        // <MaterialCommunityIcons name="home" color={color} size={size} />
                        //<CustomIcon color={color} size={size} />
                        <Image source={require('../../../../assets/ic_home.png')} style={{ width: 30, height:30 }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Setting"
                component={Setting}
                options={{
                    tabBarLabel: 'Notification',
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../../../../assets/ic_notification.png')} style={{ width: 30, height:30 }} />
                    ),
                    tabBarBadge: 3,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../../../../assets/ic_profile.png')} style={{ width: 20, height: 20 }} />

                    ),
                }}
            />
        </Tab.Navigator>
    );
}
export default MyTabs;
