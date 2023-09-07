import React from "react"
import { View } from "react-native"
import VideoPreviewCard from "./VideoPreviewCard"

const VideosLiked: React.FC = () => {
  return (
    <View className="h-full bg-background flex items-center">
      {/* Extremely hacky lol */}
      <View className="flex-row flex-wrap justify-between">
        {[...Array(10).keys()].map((_, idx) => {
          return <VideoPreviewCard key={idx} classname="my-1" />
        })}
      </View>
    </View>
  )
}

export default VideosLiked
