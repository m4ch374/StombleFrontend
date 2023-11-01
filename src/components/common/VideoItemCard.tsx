import { FC, useState, useRef, LegacyRef } from "react"
import AccountFileCard from "components/AccountFileCard"
import { AntDesign } from "@expo/vector-icons"
import { View, Text, Image, Pressable } from "react-native"
// eslint-disable-next-line import/no-extraneous-dependencies
import { Video, ResizeMode } from "expo-av"

type TVideoItem = {
  coverUrl: string
  videoUrl: string
  businessName: string
  videosLiked?: boolean
  onLikeVideos: (like: boolean) => void
}

const VideoItemCard: FC<TVideoItem> = ({
  coverUrl,
  videoUrl,
  businessName,
  videosLiked,
  onLikeVideos,
}) => {
  const video: LegacyRef<Video> = useRef(null)
  const [change, setChange] = useState(false)
  const profileHeaderPlaceholder =
    "https://stomble-users.s3.ap-southeast-2.amazonaws.com/null"

  return (
    <Pressable
      className={`
        w-[49%]
        mb-4
      `}
      onPressOut={() => {
        setChange(false)
        void video?.current?.pauseAsync()
      }}
      onLongPress={() => {
        setChange(true)
        void video?.current?.playAsync()
      }}
    >
      {change ? (
        <Video
          ref={video}
          source={{ uri: videoUrl }}
          style={{
            height: 300,
            borderRadius: 8,
            overflow: "hidden",
          }}
          isLooping
          resizeMode={ResizeMode.COVER}
        />
      ) : (
        <Image
          className="p-0"
          source={{ uri: coverUrl }}
          style={{
            height: 300,
            resizeMode: "cover",
            borderRadius: 8,
          }}
        ></Image>
      )}
      <View className="p-3 flex flex-row items-center">
        <View>
          <AccountFileCard
            uri={profileHeaderPlaceholder}
            height={30}
            width={30}
            borderRadius={50}
            style={`
              flex-row
              mr-4
            `}
          />
        </View>
        <View>
          <Text className="lato-text font-lato-bold w-[110]" numberOfLines={1}>
            {businessName}
          </Text>
        </View>
        <Pressable
          className="ml-auto"
          onPress={() => onLikeVideos(!videosLiked)}
        >
          {videosLiked ? (
            <AntDesign name="heart" size={20} color="red" />
          ) : (
            <AntDesign name="hearto" size={20} color="white" />
          )}
        </Pressable>
      </View>
    </Pressable>
  )
}

export default VideoItemCard
