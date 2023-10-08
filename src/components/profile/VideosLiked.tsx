import React, { useCallback, useEffect, useState } from "react"
import { RefreshControl, View } from "react-native"
import VideoPreviewCard from "./VideoPreviewCard"
import { useAppDispatch } from "redux/hooks"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { getLikedVideos } from "utils/services/profile"
import { Tabs } from "react-native-collapsible-tab-view"
import CustomColor from "constants/Colors"
import { TGetLikedVideos } from "types/endpoints"

const VideosLiked: React.FC = () => {
  const dispatch = useAppDispatch()

  const [refreshing, setRefreshing] = useState(false)

  const [likedVids, setLikedVids] =
    useState<TGetLikedVideos["responseType"]["result"]>()

  const updateVids = useCallback(() => {
    ;(async () => {
      const params = { take: 10 }
      const resp = await getLikedVideos(params)

      if (typeof resp === "undefined") return

      setLikedVids(resp.result)
    })()
  }, [])

  const waitUpdateVids = useCallback(
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

  useEffect(() => {
    dispatch(tmpStoreAction.setItem("numLiked", likedVids?.length || 0))
  }, [dispatch, likedVids?.length])

  return (
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
              await waitUpdateVids()
              setRefreshing(false)
            })()
          }}
        />
      }
    >
      {/* Extremely hacky lol */}
      <View className="flex-row flex-wrap justify-between mt-1">
        {likedVids &&
          likedVids.map((vid, idx) => {
            return (
              <VideoPreviewCard
                key={idx}
                classname="mb-1"
                likes={vid.videos.amount_likes.toString()}
                coverUri={vid.videos.link_cover}
              />
            )
          })}
      </View>
    </Tabs.ScrollView>
  )
}

export default VideosLiked
