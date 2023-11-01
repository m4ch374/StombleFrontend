import { Platform } from "react-native"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
// import Constants from "expo-constants"

export async function registerForPushNotificationsAsync() {
  let token: Notifications.ExpoPushToken

  if (Platform.OS === "android") {
    void Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!")
      return
    }
    // token = await Notifications.getExpoPushTokenAsync({
    //   projectId: Constants?.expoConfig?.extra?.eas.projectId,
    // });
    // token = await Notifications.getExpoPushTokenAsync()
    token = await Notifications.getExpoPushTokenAsync({
      projectId: "b442ae90-ef8e-4334-9422-e485ff7b0e0c",
    })
    return token
  } else {
    alert("Must use physical device for Push Notifications")
  }
}
