/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState, useRef } from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import * as Font from "expo-font"

import useColorScheme from "./src/hooks/useColorScheme"
import { persistor, store } from "./src/redux/store"
import MainNavigation from "./src/navigation/MainNavigation"
import * as Notifications from "expo-notifications"
import { registerForPushNotificationsAsync } from "utils/NotificationSuscription"

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
  const [, setExpoPushToken] = useState<string | null>()
  const [, setNotification] = useState<Notifications.Notification | null>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const notificationListener: any = useRef()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const responseListener: any = useRef()

  useEffect(() => {
    void registerForPushNotificationsAsync().then(token =>
      setExpoPushToken(token?.data),
    )

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        return setNotification(notification)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response)
      })

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
      Notifications.removeNotificationSubscription(notificationListener.current)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

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
