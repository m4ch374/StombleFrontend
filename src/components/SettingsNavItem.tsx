import { View, Text, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { SettingStackList } from "types/Navigation"

type Props = {
  settingText: string
  navTo: keyof SettingStackList
}

const SettingsNavItem = ({ settingText, navTo }: Props) => {
  const { navigate } = useNavigation()

  const handleOnClick = () => {
    console.log("click on screen:", navTo)
    navigate("Settings", { screen: navTo })
  }
  return (
    <View>
      <TouchableOpacity
        className="flex flex-row justify-between items-center p-[12px]"
        activeOpacity={1.0}
        onPress={handleOnClick}
      >
        <Text className="text-white font-[16px]">{settingText}</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default SettingsNavItem
