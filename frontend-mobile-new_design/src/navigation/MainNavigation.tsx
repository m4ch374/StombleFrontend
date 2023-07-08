import 
{
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  
} from '@react-navigation/native'

import React from 'react'
import { ColorSchemeName } from 'react-native'

import Navigation from './Navigation'

const MainNavigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Navigation />
    </NavigationContainer>
  )
}

export default MainNavigation
