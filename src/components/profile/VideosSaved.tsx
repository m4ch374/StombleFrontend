import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { getSavedVideos } from "utils/services/profile"
import VideoPreviewCard from "./VideoPreviewCard"
import VideoPreviewPopupGroup from "./VideoPreviewPopupGroup"

// Probably using a custom hook would be better in hindsight
const VideosSaved: React.FC = () => {
  const previewCardController = useState(false)
  const shareModalController = useState(false)
  const removeModalController = useState(false)

  // endpoint implementation check
  useEffect(() => {
    ;(async () => {
      const params = { take: 10 }
      const resp = await getSavedVideos(params)

      if (typeof resp === "undefined") return

      console.log("get saved videos:", resp)
    })()
  }, [])

  return (
    <>
      <View className="h-full bg-background flex items-center">
        {/* Extremely hacky lol */}
        <View className="flex-row flex-wrap justify-between mt-1">
          {[...Array(10).keys()].map((_, idx) => {
            return (
              <VideoPreviewCard
                key={idx}
                setModalIndexVisible={previewCardController[1]}
                classname="mb-1"
              />
            )
          })}
        </View>
      </View>

      <VideoPreviewPopupGroup
        previewModalController={{
          previewCardController,
          shareModalController,
          removeModalController,
        }}
      />
    </>
  )
}

export default VideosSaved
