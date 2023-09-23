import React from "react"
import { View } from "react-native"
import VideoInteraction from "./VideoInteraction"
import VideoDescription from "./VideoDescription"
import { TGetVideosForVideoPlay } from "types/endpoints"

type THomeVideoCardOverlay = {
  vidItem: TGetVideosForVideoPlay["responseType"]["result"][number]
  overlayHeight: number
}

const HomeVideoCardOverlay: React.FC<THomeVideoCardOverlay> = ({
  vidItem,
  overlayHeight,
}) => {
  return (
    <View
      className="w-full absolute top-0 left-0 flex justify-end"
      style={{ height: overlayHeight }}
    >
      <View className="relative flex-row justify-between items-end mx-md my-lg">
        <VideoDescription
          businessIcon={vidItem.business_account.link_icon}
          businessId={vidItem.business_account_id}
          businessName={vidItem.business_account.businessName}
          vidDescription={vidItem.description}
        />
        <VideoInteraction vidId={vidItem.id} numLiked={vidItem.amount_likes} />
      </View>
    </View>
  )
}

export default HomeVideoCardOverlay
