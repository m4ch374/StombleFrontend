import { AVPlaybackStatusSuccess, ResizeMode, Video } from "expo-av"
import React, {
  Dispatch,
  LegacyRef,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react"
import { Pressable } from "react-native"
import customTwMerge from "utils/CustomTwMerge"
import VideoSeekBar from "./VideoSeekBar"
import HomeVideoCardOverlay from "./HomeVideoCardOverlay"
import { TGetVideosForVideoPlay } from "types/endpoints"
import HomeVideoPauseOverlay from "./HomeVideoPauseOverlay"

const SEEKBAR_HEIGHT = 20

type THomeVideoCard = {
  vidItem: TGetVideosForVideoPlay["responseType"]["result"][number] // Type Gymnastics
  videoHeight: number
  isFocused: boolean
  setScrollEnable: Dispatch<SetStateAction<boolean>>
  classname?: string
}

const HomeVideoCard: React.FC<THomeVideoCard> = ({
  vidItem,
  videoHeight,
  isFocused,
  setScrollEnable,
  classname = "",
}) => {
  const vidRef: LegacyRef<Video> = useRef(null)
  const [paused, setPaused] = useState(false)

  const [currMillis, setCurrMillis] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)

  const actualVidHeight = useMemo(() => {
    return videoHeight - 4
  }, [videoHeight])

  return (
    // Using css in js bc native wind might not be able to handle specific px
    <Pressable
      onPress={() => {
        ;(async () => {
          paused
            ? await vidRef.current?.playAsync()
            : await vidRef.current?.pauseAsync()

          setPaused(state => !state)
        })()
      }}
      style={{ height: videoHeight }}
    >
      <Video
        ref={vidRef}
        source={{ uri: vidItem.link_video }}
        className={customTwMerge("w-full", classname)}
        style={{ height: actualVidHeight }}
        resizeMode={ResizeMode.COVER}
        isLooping={true}
        shouldPlay={isFocused}
        progressUpdateIntervalMillis={100}
        onPlaybackStatusUpdate={status => {
          const currStatus = status as AVPlaybackStatusSuccess
          setCurrMillis(currStatus.positionMillis)
        }}
        onLoad={status => {
          const currStat = status as AVPlaybackStatusSuccess
          setTotalDuration(currStat.durationMillis || 0)
        }}
      />
      <VideoSeekBar
        vidRef={vidRef}
        seekBarHeight={SEEKBAR_HEIGHT}
        currMillis={currMillis}
        totalDuration={totalDuration}
        setScrollEnable={setScrollEnable}
        setPause={setPaused}
      />

      <HomeVideoCardOverlay vidItem={vidItem} overlayHeight={actualVidHeight} />

      {paused && (
        <HomeVideoPauseOverlay
          currMill={currMillis}
          totalDuration={totalDuration}
          overlayHeight={actualVidHeight}
        />
      )}
    </Pressable>
  )
}

export default HomeVideoCard
