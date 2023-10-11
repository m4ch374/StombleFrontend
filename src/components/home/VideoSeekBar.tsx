import { Video } from "expo-av"
import { Playback } from "expo-av/build/AV"
import useDebounceValue from "hooks/useDebounceValue"
import React, {
  Dispatch,
  LegacyRef,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { Pressable, View, useWindowDimensions } from "react-native"

type TVideoSeekBar = {
  vidRef: LegacyRef<Video>
  seekBarHeight: number
  currMillis: number
  totalDuration: number
  setScrollEnable: Dispatch<SetStateAction<boolean>>
  setPause: Dispatch<SetStateAction<boolean>>
}

const VideoSeekBar: React.FC<TVideoSeekBar> = ({
  vidRef,
  seekBarHeight,
  currMillis,
  totalDuration,
  setScrollEnable,
  setPause,
}) => {
  const { width } = useWindowDimensions()

  const [seekMillis, setSeekMillis] = useDebounceValue(0)
  const [progPercent, setProgPercent] = useState(0)

  const [seeking, setSeeking] = useState(false)

  useEffect(() => {
    if (seeking) return

    setProgPercent(totalDuration === 0 ? 0 : (currMillis / totalDuration) * 100)
  }, [currMillis, seeking, totalDuration])

  return (
    <Pressable
      className="w-full justify-end absolute bottom-0 left-0"
      style={{ height: seekBarHeight }}
      onPressIn={() => {
        setScrollEnable(false)
        setSeeking(true)
      }}
      onTouchMove={event => {
        const seekPercentage = event.nativeEvent.locationX / width
        setSeekMillis(seekPercentage * totalDuration)
        setProgPercent(parseFloat((seekPercentage * 100).toFixed(2)))
      }}
      onPressOut={() => {
        ;(async () => {
          setScrollEnable(true)
          setPause(false)
          setSeeking(false)
          await (vidRef as { current: Playback }).current.playFromPositionAsync(
            seekMillis || 0,
          )
        })()
      }}
    >
      <View className="w-full h-2 bg-gray-darkest">
        <View
          className="bg-gray-lighter"
          style={{ height: seekBarHeight, width: `${progPercent}%` }}
        />
      </View>
    </Pressable>
  )
}

export default VideoSeekBar
