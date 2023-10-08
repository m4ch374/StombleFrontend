import React, { useCallback, useEffect, useState } from "react"
import { RefreshControl, View } from "react-native"
import { getSavedVideos } from "utils/services/profile"
import VideoPreviewCard from "./VideoPreviewCard"
import VideoPreviewPopupGroup from "./VideoPreviewPopupGroup"
import { TGetSavedVideos } from "types/endpoints"
import { Tabs } from "react-native-collapsible-tab-view"
import CustomColor from "constants/Colors"

// Probably using a custom hook would be better in hindsight
const VideosSaved: React.FC = () => {
  const previewCardController = useState(false)
  const shareModalController = useState(false)
  const removeModalController = useState(false)

  const [refreshing, setRefreshing] = useState(false)

  const [savedVids, setSavedVids] =
    useState<TGetSavedVideos["responseType"]["result"]>()

  const updateVids = useCallback(() => {
    ;(async () => {
      const params = { take: 10 }
      const resp = await getSavedVideos(params)

      if (typeof resp === "undefined") return

      setSavedVids(resp.result)
    })()
  }, [])

  const waitUpdate = useCallback(
    () =>
      new Promise<void>(resolve => {
        updateVids()
        resolve()
      }),
    [updateVids],
  )

  // endpoint implementation check
  useEffect(() => {
    updateVids()
  }, [updateVids])

  return (
    <>
      <Tabs.ScrollView
        style={{
          height: "100%",
          backgroundColor: CustomColor.background,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              ;(async () => {
                setRefreshing(true)
                await waitUpdate()
                setRefreshing(false)
              })()
            }}
          />
        }
      >
        {/* Extremely hacky lol */}
        <View className="flex-row flex-wrap justify-between mt-1">
          {savedVids &&
            savedVids.map((vid, idx) => {
              return (
                <VideoPreviewCard
                  key={idx}
                  setModalIndexVisible={previewCardController[1]}
                  classname="mb-1"
                  likes={vid.videos.amount_likes.toString()}
                  coverUri={vid.videos.link_cover}
                />
              )
            })}
        </View>
      </Tabs.ScrollView>

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
