import React, { useCallback } from "react"
import { View, Text } from "react-native"
import { Entypo } from "@expo/vector-icons"

type THomeVideoPauseOverlay = {
  currMill: number
  totalDuration: number
  overlayHeight: number
}

const HomeVideoPauseOverlay: React.FC<THomeVideoPauseOverlay> = ({
  currMill,
  totalDuration,
  overlayHeight,
}) => {
  const millisToNormalFormat = useCallback((millis: number) => {
    const secs = Math.floor(millis / 1000) % 60
    const mins = Math.floor(millis / 1000 / 60)

    const leftPad = (num: number) => {
      return num.toString().padStart(2, "0")
    }

    return `${leftPad(mins)}:${leftPad(secs)}`
  }, [])

  return (
    <View
      className="w-full absolute left-0 top-0 items-center justify-center"
      style={{
        height: overlayHeight,
      }}
    >
      <View
        style={{
          shadowColor: "black",
          shadowOpacity: 1,
          shadowRadius: 100,
        }}
      >
        <Entypo name="controller-play" size={80} color="white" />
      </View>
      <Text className="lato-text font-lato-bold">
        {millisToNormalFormat(currMill)} / {millisToNormalFormat(totalDuration)}
      </Text>
    </View>
  )
}

export default HomeVideoPauseOverlay
