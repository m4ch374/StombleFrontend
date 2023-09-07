import { useEffect, useState } from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import * as Font from "expo-font"

import useColorScheme from "./src/hooks/useColorScheme"
import { persistor, store } from "./src/redux/store"
import MainNavigation from "./src/navigation/MainNavigation"

/**
 * Import fonts
 */

// I mean yeah, disabling eslint on this block makes sense
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const fontFamily = {
  "Lato-400": require("./src/assets/fonts/Lato-Regular.ttf"),
  "Lato-700": require("./src/assets/fonts/Lato-Bold.ttf"),
  "Lato-900": require("./src/assets/fonts/Lato-Black.ttf"),
  "Roboto-400": require("./src/assets/fonts/Roboto-Regular.ttf"),
  AT: require("./src/assets/fonts/AnekTelugu-ExtraBold.ttf"),
}
/* eslint-enable @typescript-eslint/no-unsafe-assignment */

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)
  const colorScheme = useColorScheme()

  /**
   * Load font
   */
  useEffect(() => {
    // We use IIFE instead
    ;(async () => {
      try {
        await Font.loadAsync(fontFamily)
      } catch (e) {
        console.warn(e)
      } finally {
        setFontLoaded(true)
      }
    })()
  }, [])

  if (!fontLoaded) {
    return null
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainNavigation colorScheme={colorScheme} />
      </PersistGate>
    </Provider>
  )
}
