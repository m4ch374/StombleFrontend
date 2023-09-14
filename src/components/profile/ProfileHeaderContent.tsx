import { useNavigation } from "@react-navigation/native"
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native"
import { useAppSlector } from "redux/hooks"

const ProfileHeaderContent = () => {
  const tmpUser = useAppSlector(state => state.tmpStore)

  const navigation = useNavigation()

  return (
    <View className="m-md">
      <View className="flex-row gap-16 items-center">
        <ImageBackground
          // Copied from Account file card tsx
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          source={require("assets/user_icon.png")}
          resizeMode="cover"
          className="rounded-full justify-center bg-slate-400 w-[70px] h-[70px] overflow-hidden"
        >
          <Image
            source={{ uri: tmpUser.link_icon }}
            style={{
              height: 70,
              width: 70,
              resizeMode: "cover",
            }}
          />
        </ImageBackground>

        <View className="flex-1 flex-row justify-between">
          <View className="flex-1 items-center gap-2">
            <Text className="lato-text font-lato-bold text-xl">
              {tmpUser.numLiked}
            </Text>
            <Text className="lato-text text-xs">Liked</Text>
          </View>

          <View className="flex-1 items-center gap-2">
            <Text className="lato-text font-lato-bold text-xl">
              {tmpUser.numShared}
            </Text>
            <Text className="lato-text text-xs">Shared</Text>
          </View>

          <View className="flex-1 items-center gap-2">
            <Text className="lato-text font-lato-bold text-xl">
              {tmpUser.numFollowing}
            </Text>
            <Text className="lato-text text-xs">Following</Text>
          </View>
        </View>
      </View>

      <View className="mb-md">
        <Text className="lato-text text-gray-lighter text-sm mt-sm">
          Placehlder Consultant
        </Text>

        <Text className="lato-text font-lato-bold text-secondary text-sm">
          Placeholder.com
        </Text>
      </View>

      <TouchableOpacity
        className="
          border-2
          border-secondary
          rounded-sm
          h-[34px]
          w-[50%]
          justify-center
          items-center"
        onPress={() => {
          navigation.navigate("Settings", { screen: "AccountInfoIndex" })
        }}
      >
        <Text className="lato-text text-sm font-lato-bold text-secondary">
          Edit Profile
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileHeaderContent
