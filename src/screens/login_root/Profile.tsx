// REFERENCE: For Users - Business Profile
// idk what that meant lol

import { Text, StatusBar, View, TouchableOpacity } from "react-native"
import BackgroundColour from "components/styled_components/BackgroundColour"
import { useNavigation } from "@react-navigation/native"

const Profile = () => {
  const navigation = useNavigation()

  // We'll keep the workaround this way, probably embed this in <BackgroundColour /> in the future
  return (
    <BackgroundColour>
      <View
        className={`
          flex
          justify-center
          items-center
          h-full
          pt-[${StatusBar.currentHeight ? StatusBar.currentHeight + 1 : 0}px]
      `}
      >
        <TouchableOpacity
          className="bg-blue-500 p-2 rounded-md"
          onPress={() =>
            navigation.navigate("Settings", { screen: "SettingsIndex" })
          }
        >
          <Text className="text-white">Click me for settings</Text>
        </TouchableOpacity>
      </View>
    </BackgroundColour>
  )
}

export default Profile
