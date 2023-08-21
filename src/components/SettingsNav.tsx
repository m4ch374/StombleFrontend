import { View, Text, FlatList } from "react-native"
import { SettingStackList } from "types/Navigation"
import SettingsNavItem from "./SettingsNavItem"

type Props = {
  title: string
  data: {
    key: string
    navItem: string
    navTo: keyof SettingStackList
  }[]
}

const SettingsNav = ({ title, data }: Props) => {
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
            <SettingsNavItem settingText={item.navItem} navTo={item.navTo} />
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
