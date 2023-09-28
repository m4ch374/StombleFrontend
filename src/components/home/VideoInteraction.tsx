import IconLike from "assets/icons/IconLike"
import IconMore from "assets/icons/IconMore"
import IconSave from "assets/icons/IconSave"
import IconShare from "assets/icons/IconShare"
import React, { useCallback, useContext, useState } from "react"
import { Pressable, View, Text } from "react-native"
import HomeModalControllerContext from "./HomeModalControllerContext"
import {
  likeVideo,
  saveVideo,
  unSaveVideo,
  unlikeVideo,
} from "utils/services/videoPlay"

type TVideoInteraction = {
  vidId: string
  numLiked: number
}

const VideoInteraction: React.FC<TVideoInteraction> = ({ vidId, numLiked }) => {
  const contollerContext = useContext(HomeModalControllerContext)

  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleLike = useCallback(() => {
    ;(async () => {
      const payload = { videoId: vidId }
      const resp = liked ? await unlikeVideo(payload) : await likeVideo(payload)

      if (typeof resp === "undefined") return

      setLiked(state => !state)
    })()
  }, [liked, vidId])

  const handleSaved = useCallback(() => {
    ;(async () => {
      const payload = { videoId: vidId }
      const resp = saved ? await unSaveVideo(payload) : await saveVideo(payload)

      if (typeof resp === "undefined") return

      setSaved(state => !state)
    })()
  }, [saved, vidId])

  return (
    <View className="w-[50px] flex-col gap-y-[36px]">
      <View className="flex-col items-center gap-y-sm">
        <Pressable onPress={handleLike}>
          <IconLike color={liked ? "red" : "white"} />
        </Pressable>
        <Text className="lato-text font-lato-bold">
          {liked ? numLiked + 1 : numLiked}
        </Text>
      </View>

      <View className="flex-col items-center">
        <Pressable onPress={handleSaved}>
          <IconSave color={saved ? "orange" : "white"} />
        </Pressable>
        <Text className="lato-text font-lato-bold">Save</Text>
      </View>

      <View className="flex-col items-center">
        <Pressable
          onPress={() => {
            contollerContext.shareModal(true)
          }}
        >
          <IconShare />
        </Pressable>
        <Text className="lato-text font-lato-bold">Share</Text>
      </View>

      <View className="flex-col items-center">
        <Pressable
          onPress={() => {
            contollerContext.moreModal(true)
          }}
        >
          <IconMore />
        </Pressable>
        <Text className="lato-text font-lato-bold">More</Text>
      </View>
    </View>
  )
}

export default VideoInteraction
