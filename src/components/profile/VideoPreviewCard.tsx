import React from "react"
import { View, Pressable } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import customTwMerge from "utils/CustomTwMerge"
import LatoText from "components/styled_components/LatoText"

type TVideoPreviewCard = {
  classname?: string
}

const VideoPreviewCard: React.FC<TVideoPreviewCard> = ({ classname = "" }) => {
  return (
    <Pressable
      className={customTwMerge(
        "w-[124px] h-[160px] bg-gray-mid rounded-sm p-sm flex justify-between",
        classname,
      )}
    >
      <View className="flex-row items-center gap-sm">
        <View className="bg-white rounded-full w-[16px] aspect-square" />
        <View>
          <LatoText classname="text-4">Placeholder</LatoText>
        </View>
      </View>

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
            <LatoText classname="text-4">Placeholder</LatoText>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default VideoPreviewCard