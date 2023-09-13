import React, { useEffect } from "react"
import { View } from "react-native"
import VideoPreviewCard from "./VideoPreviewCard"
import { useAppDispatch } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { getLikedVideos } from "utils/services/profile"

const VideosLiked: React.FC = () => {
  const dispatch = useAppDispatch()

  // endpoint implementation check
  useEffect(() => {
    ;(async () => {
      const params = { take: 10 }
      const resp = await getLikedVideos(params)

      if (typeof resp === "undefined") return

      console.log("get liked videos:", resp)
    })()
  }, [])

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
