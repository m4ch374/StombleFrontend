import React from "react"
import { View, Text, Pressable } from "react-native"
import { AntDesign } from "@expo/vector-icons"

type TVideoPreviewCard = {
  classname?: string
}

const VideoPreviewCard: React.FC<TVideoPreviewCard> = ({ classname = "" }) => {
  return (
    <Pressable
      className={`
        w-[124px]
        h-[160px]
        bg-gray-600
        rounded-md
        p-2
        flex
        justify-between
        ${classname}
      `}
    >
      <View className="flex-row items-center gap-1">
        <View className="bg-white rounded-full w-[16] aspect-square" />
        <Text className="text-white font-Lato text-[8px]">Placeholder</Text>
      </View>

      <View className="flex-row justify-between">
        <View className="flex-row items-center gap-1">
          <AntDesign name="caretright" size={8} color="white" />
          <Text className="text-white font-Lato text-[8px]">10K</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <AntDesign name="heart" size={8} color="red" />
          <Text className="text-white font-Lato text-[8px]">Placeholder</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default VideoPreviewCard
