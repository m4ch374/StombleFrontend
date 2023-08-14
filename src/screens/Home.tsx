// REFERENCE: PLACEHOLDER

import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { LoginRootTabList } from "types/Navigation"
import { useEffect } from "react"
import { View, Text } from "native-base"

interface Props {
  navigation: NativeStackNavigationProp<LoginRootTabList, "Home">
}

const Home = ({ navigation }: Props) => {
  // To keep eslint happy
  useEffect(() => {
    console.log(navigation.getId())
  }, [navigation])

  // Id recommend using safe area view on ios
  return (
    <View className="p-10">
      <Text className="text-4xl">Lorem Ipsum</Text>
    </View>
  )
}

export default Home
