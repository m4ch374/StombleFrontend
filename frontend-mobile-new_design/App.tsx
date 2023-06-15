import React, { useEffect, useState } from 'react'
import { NativeBaseProvider } from 'native-base'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import * as Font from 'expo-font'

import customTheme from './src/constants/Theme'
import useColorScheme from './src/hooks/useColorScheme'
import { persistor, store } from './src/redux/store'
import MainNavigation from './src/navigation/MainNavigation'

/**
 * Import fonts
 */
const fontFamily = {
  'Lato-400': require('./assets/fonts/Lato-Regular.ttf'),
  'Lato-700': require('./assets/fonts/Lato-Bold.ttf'),
  'Lato-900': require('./assets/fonts/Lato-Black.ttf'),
  'Roboto-400': require('./assets/fonts/Roboto-Regular.ttf'),
  AT: require('./assets/fonts/AnekTelugu-ExtraBold.ttf'),
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)
  const colorScheme = useColorScheme()

  /**
   * Load font
   */
  useEffect(() => {
    const getFonts = async () => {
      try {
        await Font.loadAsync(fontFamily)
      } catch (e) {
        console.warn(e)
      } finally {
        setFontLoaded(true)
      }
    }
    getFonts()
  }, [])

  if (!fontLoaded) {
    return null
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider theme={customTheme}>
          <MainNavigation colorScheme={colorScheme} />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  )
}
