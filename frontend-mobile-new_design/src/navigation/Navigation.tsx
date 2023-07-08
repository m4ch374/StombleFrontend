import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
import AuthStack from './AuthStack'
import RooTabStack from './RooTabStack'
import { RootStackParamList } from './Navigation.interface'
import NotFoundScreen from '../screens/NotFound/NotFoundScreen'
import { selectToken } from '../redux/reducers/user.reducer'

const StackScreen = createNativeStackNavigator<RootStackParamList>()

export default function Navigation() {
  const token = useSelector(selectToken)

  return (
    <StackScreen.Navigator
      initialRouteName='Auth'
      screenOptions={{ headerShown: false }}
    >
      {!token && (
        <StackScreen.Screen
          component={AuthStack}
          name='Auth'
          options={{ headerShown: false }}
        />
      )}
      <StackScreen.Screen
        name='Root'
        component={RooTabStack}
        options={{ headerShown: false }}
      />
      <StackScreen.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </StackScreen.Navigator>
  )
}
