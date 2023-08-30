import React from "react"
import { View } from "react-native"
import VideoPreviewCard from "./VideoPreviewCard"
import { ScrollRefreshChildScroll } from "components/styled_components/ScrollRefresh"

const VideosLiked: React.FC = () => {
  return (
    <View className="h-full bg-background flex items-center">
      <ScrollRefreshChildScroll>
        {/* Extremely hacky lol */}
        <View className="flex-row flex-wrap justify-between">
          {[...Array(10).keys()].map((_, idx) => {
            return <VideoPreviewCard key={idx} classname="my-1" />
          })}
        </View>
      </ScrollRefreshChildScroll>
    </View>
  )
}

export default VideosLiked
