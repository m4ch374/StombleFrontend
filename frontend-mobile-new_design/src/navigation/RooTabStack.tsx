import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RootTabParamList } from './Navigation.interface'
import BackgroundColor from '../style/BackgroundColor'
import useColorScheme from '../hooks/useColorScheme'
import { useTheme } from 'native-base'
import HomeStack from './HomeStack'
import SearchStack from './SearchStack'
import ProfileStack from './ProfileStack'
import ProfessionalStack from './ProfessionalStack'
import TabBar from '../components/TabBar'
import React from 'react'

const BottomTab = createBottomTabNavigator<RootTabParamList>()

const RooTabStack = () => {
  const colorScheme = useColorScheme()
  const { color } = useTheme().colors
  const whiteColor = color.white
  const primaryColor = color.primary

  return (
    <BackgroundColor>
      <BottomTab.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: color.tabBarBgColor,
            height: 83,
            borderTopColor: 'transparent',
          },
          tabBarIcon: ({ focused, size }) => TabBar({ focused, size }),
          // tabBarActiveTintColor: '#e67a15',
          // tabBarInactiveTintColor: 'gray',
        }}
      >
        <BottomTab.Screen
          name='Home'
          component={HomeStack}
          options={{ title: '' }}
        />
        <BottomTab.Screen
          name='Search'
          component={SearchStack}
          options={{ title: '' }}
        />
        <BottomTab.Screen
          name='ProfileTab'
          component={ProfileStack}
          options={{ title: '' }}
        />
        <BottomTab.Screen
          name='Professional'
          component={ProfessionalStack}
          options={{ title: '' }}
        />
      </BottomTab.Navigator>
    </BackgroundColor>
  )
}

export default RooTabStack
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />;
// }
