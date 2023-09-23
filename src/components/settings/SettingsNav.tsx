import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import LatoText from "components/styled_components/LatoText"
import { SettingsMenuListType } from "constants/SettingsMenuItems"
import { View, TouchableOpacity, FlatList } from "react-native"

type Props = {
  title: string
  data: SettingsMenuListType[]
}

const SettingsNav = ({ title, data }: Props) => {
  const { navigate } = useNavigation()

  return (
    <View className="mb-lg">
      <View>
        <LatoText classname="text-gray-lighter text-sm mb-4">{title}</LatoText>
      </View>

      <View className="rounded-sm bg-navbar">
        <FlatList
          data={data}
          scrollEnabled={false}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex flex-row justify-between items-center px-8 py-6"
              activeOpacity={1.0}
              onPress={() => navigate("Settings", { screen: item.navTo })}
            >
              <LatoText>{item.navItem}</LatoText>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => (
            <View className="h-[2px] w-full bg-background" />
          )}
        />
      </View>
    </View>
  )
}

export default SettingsNav
