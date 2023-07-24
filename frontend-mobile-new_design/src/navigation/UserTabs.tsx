import History from '../screens/tab/userTab/History';
import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View,Text } from 'react-native';
import { Feather,AntDesign,MaterialIcons } from '@expo/vector-icons';
import Liked from '../screens/tab/userTab/Liked';
import Following from '../screens/tab/userTab/Following';
import { Layout } from '../constants/Layout';
import { ProfileStackList } from './Navigation.interface';
import { useTheme } from 'native-base';
import { useNavigationState } from '@react-navigation/native';


const Profile = createMaterialTopTabNavigator<ProfileStackList>();

interface Props {
  navigation: any;
}

const UserTabs = ({navigation}: Props) => {
  const {color} = useTheme().colors;
  const state = useNavigationState((s) => s);

  useEffect(() => {
    if (state?.routes[0].state?.index && state.routes[0].state.index > 0) {
      navigation?.setOptions({
        tabBarStyle: {
          display: 'none',
          backgroundColor: '#0B52BC',
          height: 80,
          padding: 20,
          borderTopColor: color.secondary,
          color: color.white,
        },
      });
    } else {
      navigation?.setOptions({
        tabBarStyle: {
          backgroundColor: '#0B52BC',
          height: 80,
          padding: 20,
          borderTopColor: color.secondary,
          color: color.secondary,
        },
      });
    }
  }, [state, navigation, color]);
  return (
    <Profile.Navigator
      initialRouteName='History'
      screenOptions={() => ({
        tabBarItemStyle: {
          width: Layout.deviceWidth / 2,
          backgroundColor: 'transparent',
          paddingBottom: 8,
        },
        tabBarContentContainerStyle: {
          width: Layout.deviceWidth,
          //height: 100,
          backgroundColor: '#02022F',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
        },
        tabBarIndicatorStyle: {
          marginLeft:20,
          backgroundColor: 'white',
          height: 2,
          width: 100,
        },
      })}>
      <Profile.Screen
        name='Following'
        component={Following}
        options={{
          tabBarLabel: ({focused}) => (
            <View className='flex-row gap-[8px] justify-center items-center'
              style={
                focused
                  ? {
                      borderWidth: 2,
                      width: 100,
                      height: 35,
                      borderColor: 'transparent',
                      borderBottomColor: 'white',
                      // paddingLeft: 20,
                    }
                  : {paddingLeft: 20}
              }>
              <Feather
                name='home'
                size={20}
                color={focused ? 'white' : 'rgba(255, 255, 255, 0.4)'}
              />
                <Text className='text-[14px] text-white'>Following</Text>
            </View>
          ),
        }}
      />
      <Profile.Screen
        name='Liked'
        component={Liked}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <View className='flex-row gap-[8px] justify-center items-center'
                style={
                  focused
                    ? {
                        borderWidth: 2,
                        width: 110,
                        height: 35,
                        borderColor: 'transparent',
                        borderBottomColor: 'white',
                        // paddingLeft: 20,
                      }
                    : {paddingLeft: 20}
                }>
                <AntDesign
                  name='hearto'
                  color={focused ? 'white' : 'rgba(255, 255, 255, 0.4)'}
                  size={20}
                />
                <Text className='text-[14px] text-white'>Liked Videos</Text>
              </View>
            );
          },
        }}
      />
      <Profile.Screen
        name='Liked Vedios'
        component={History}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <View className='flex-row gap-[8px] justify-center items-center'
                style={
                  focused
                    ? {
                        borderWidth: 2,
                        width: 100,
                        height: 35,
                        borderColor: 'transparent',
                        borderBottomColor: 'white',
                        //paddingLeft: 20,
                      }
                    : {paddingLeft: 20}
                }>
                
                <MaterialIcons name="bookmark" size={24} color={focused?'white':'rgba(255, 255, 255, 0.4)'}/>
                <Text className='text-[14px] text-white'>Liked Vedios</Text>
              </View>
            );
          },
        }}
      />
      
      
    </Profile.Navigator>
  );
};

export default UserTabs;
