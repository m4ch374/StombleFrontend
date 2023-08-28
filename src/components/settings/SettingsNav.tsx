import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { SettingsMenuListType } from "constants/SettingsMenuItems"
import { View, Text, FlatList, TouchableOpacity } from "react-native"

type Props = {
  title: string
  data: SettingsMenuListType[]
}

const SettingsNav = ({ title, data }: Props) => {
  const { navigate } = useNavigation()

  return (
    <View className="mb-8">
      <View>
        <Text className="text-textTert">{title}</Text>
      </View>

      <View className="mt-2 rounded-[5px] bg-bgText">
        <FlatList
          data={data}
          scrollEnabled={false}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex flex-row justify-between items-center p-[12px]"
              activeOpacity={1.0}
              onPress={() => navigate("Settings", { screen: item.navTo })}
            >
              <Text className="text-white font-[16px]">{item.navItem}</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => (
            <View className="h-[0.8px] w-full bg-white opacity-10" />
          )}
        />
      </View>
    </View>
  )
}

export default SettingsNav
