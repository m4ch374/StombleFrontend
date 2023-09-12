import React, { useEffect } from "react"
import { View } from "react-native"
import VideoPreviewCard from "./VideoPreviewCard"
import { useAppDispatch } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"

const VideosLiked: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(tmpStoreAction.setItem("numLiked", 10))
  }, [dispatch])

  return (
    <View className="h-full bg-background flex items-center">
      {/* Extremely hacky lol */}
      <View className="flex-row flex-wrap justify-between mt-1">
        {[...Array(10).keys()].map((_, idx) => {
          return <VideoPreviewCard key={idx} classname="mb-1" />
        })}
      </View>
    </View>
  )
}

export default VideosLiked
