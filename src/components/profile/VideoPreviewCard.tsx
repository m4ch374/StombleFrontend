import React from "react"
import { View, Pressable, ImageBackground } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import customTwMerge from "utils/CustomTwMerge"
import LatoText from "components/styled_components/LatoText"
import ThreeDotsVertical from "assets/icons/ThreeDotsVertical"
import { useNavigation } from "@react-navigation/native"

type TVideoPreviewCard = {
  classname?: string
  likes: string
  coverUri: string
  setModalIndexVisible?: React.Dispatch<React.SetStateAction<boolean>>
}

const VideoPreviewCard: React.FC<TVideoPreviewCard> = ({
  classname = "",
  likes,
  coverUri,
  setModalIndexVisible,
}) => {
  const navigation = useNavigation()

  return (
    <>
      <Pressable
        className={customTwMerge(
          "w-[33%] h-[160px] bg-gray-mid p-sm flex justify-between",
          classname,
        )}
        onPress={() => {
          navigation.navigate("LoginRoot", { screen: "Home" })
        }}
      >
        <ImageBackground source={{ uri: coverUri }}>
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-sm">
              <View className="bg-white rounded-full w-[16px] aspect-square" />
              <View>
                <LatoText classname="text-4">Placeholder</LatoText>
              </View>
            </View>

            {typeof setModalIndexVisible !== "undefined" && (
              <Pressable
                onPress={e => {
                  e.stopPropagation()
                  setModalIndexVisible(true)
                }}
              >
                <ThreeDotsVertical classname="h-10" />
              </Pressable>
            )}
          </View>
        </ImageBackground>

        <View className="flex-row justify-between">
          <View className="flex-row items-center gap-2">
            <AntDesign name="caretright" size={8} color="white" />
            <View>
              <LatoText classname="text-4">10K</LatoText>
            </View>
          </View>
          <View className="flex-row items-center gap-2">
            <AntDesign name="heart" size={8} color="red" />
            <View>
              <LatoText classname="text-4">{likes}</LatoText>
            </View>
          </View>
        </View>
      </Pressable>
    </>
  )
}

export default VideoPreviewCard
