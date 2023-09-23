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
}

const VideoSeekBar: React.FC<TVideoSeekBar> = ({
  vidRef,
  seekBarHeight,
  currMillis,
  totalDuration,
  setScrollEnable,
}) => {
  const { width } = useWindowDimensions()

  const [seekMillis, setSeekMillis] = useDebounceValue(0)
  const [progPercent, setProgPercent] = useState(0)

  useEffect(() => {
    setProgPercent(totalDuration === 0 ? 0 : (currMillis / totalDuration) * 100)
  }, [currMillis, totalDuration])

  return (
    <Pressable
      className="w-full bg-gray-darkest"
      style={{ height: seekBarHeight }}
      onPressIn={() => {
        ;(async () => {
          setScrollEnable(false)
          await (vidRef as { current: Playback }).current.pauseAsync()
        })()
      }}
      onTouchMove={event => {
        const seekPercentage = event.nativeEvent.locationX / width
        setSeekMillis(seekPercentage * totalDuration)
        setProgPercent(parseFloat((seekPercentage * 100).toFixed(2)))
      }}
      onPressOut={() => {
        ;(async () => {
          setScrollEnable(true)
          await (vidRef as { current: Playback }).current.playFromPositionAsync(
            seekMillis || 0,
          )
        })()
      }}
    >
      <View
        className="w-[50%] bg-gray-lighter"
        style={{ height: seekBarHeight, width: `${progPercent}%` }}
      />
    </Pressable>
  )
}

export default VideoSeekBar
