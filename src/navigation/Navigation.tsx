import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackList } from '../types/Navigation'
import AuthStackNavigator from './AuthStack'
import LoginRootTab from './login_root/LoginRootTab'

const RootStack = createNativeStackNavigator<RootStackList>()

export default function Navigation() {
  return (
    <RootStack.Navigator
      initialRouteName='Auth'
      screenOptions={{ headerShown: false }}
    >
      {/* TODO: implement auth logic */}
      <RootStack.Screen
        component={AuthStackNavigator}
        name='Auth'
        options={{ headerShown: false }}
      />

      <RootStack.Screen
        name='LoginRoot'
        component={LoginRootTab}
        options={{ headerShown: false }}
      />

      {/* TODO: add not found after refactor */}
    </RootStack.Navigator>
  )
}
