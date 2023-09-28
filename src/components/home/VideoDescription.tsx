import React, { useCallback, useState } from "react"
import { View, Text, Image, ImageBackground, Pressable } from "react-native"
import { followBusiness } from "utils/services/videoPlay"

type TVideoDescription = {
  businessId: string
  businessIcon: string
  businessName: string
  vidDescription: string
}

const VideoDescription: React.FC<TVideoDescription> = ({
  businessId,
  businessIcon,
  businessName,
  vidDescription,
}) => {
  const [followed, setFollowed] = useState(false)

  const handleFollow = useCallback(() => {
    ;(async () => {
      const resp = await followBusiness({ businessToFollowing: businessId })

      if (typeof resp === "undefined") return

      setFollowed(state => !state)
    })()
  }, [businessId])

  return (
    <View className="flex-1 mr-md">
      <View className="flex-row items-center">
        <ImageBackground // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          source={require("assets/user_icon.png")}
        >
          <Image
            source={{ uri: businessIcon }}
            className="h-20 aspect-square"
          />
        </ImageBackground>
        <Text className="lato-text font-lato-bold text-9 mx-sm">
          {businessName}
        </Text>
        <Pressable
          className={`
            ${followed ? "bg-transparent border border-white" : "bg-primary"}
            w-[76px]
            h-[36px]
            rounded-sm
            flex
            items-center
            justify-center
          `}
          onPress={handleFollow}
        >
          <Text className="lato-text font-lato-bold text-7">
            {followed ? "Following" : "Follow"}
          </Text>
        </Pressable>
      </View>
      <Text className="lato-text">{vidDescription}</Text>
    </View>
  )
}

export default VideoDescription
