// REFERENCE: Home Page

import {
  BottomTabNavigationProp,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"
import VideoShareModal from "components/VideoShareModal"
import HomeModalControllerContext from "components/home/HomeModalControllerContext"
import HomeVideoCard from "components/home/HomeVideoCard"
import ModalSettingsBtn from "components/profile/ModalSettingsBtn"
import SwipableModal from "components/styled_components/SwipableModal"
import { isDevice } from "expo-device"
import useDebounceValue from "hooks/useDebounceValue"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
  useWindowDimensions,
  Platform,
  StatusBar,
  FlatList,
} from "react-native"
import { LoginRootTabList } from "types/Navigation"
import { TGetVideosForVideoPlay } from "types/endpoints"
import { getVideosForVideoPlay } from "utils/services/videoPlay"

const Home: React.FC = () => {
  const navigation = useNavigation<BottomTabNavigationProp<LoginRootTabList>>()

  const [videos, setVideos] = useState<
    TGetVideosForVideoPlay["responseType"]["result"]
  >([])

  const [tabFocused, setTabFocused] = useState(false)

  const tabFocusedHandler = useCallback(() => {
    setTabFocused(true)
  }, [])

  const tabBlurredHandler = useCallback(() => {
    setTabFocused(false)
  }, [])

  useEffect(() => {
    ;(async () => {
      const resp = await getVideosForVideoPlay({
        take: 4,
        skip: 0,
      })

      if (typeof resp === "undefined") return

      setVideos(resp.result)
    })()

    navigation.addListener("focus", tabFocusedHandler)
    navigation.addListener("blur", tabBlurredHandler)

    return () => {
      navigation.removeListener("focus", tabFocusedHandler)
      navigation.removeListener("blur", tabBlurredHandler)
    }
  }, [navigation, tabBlurredHandler, tabFocusedHandler])

  const { height } = useWindowDimensions()
  const tabBarHeight = useBottomTabBarHeight()
  const videoHeight = useMemo(() => {
    // useWindowDimensions is kinda wacky, as in, sometimes it does not account for status bar height
    // causing wierd rendering issues
    //
    // NOTE: requires more testing on ios devices
    const additionalHeight =
      Platform.OS === "android"
        ? isDevice
          ? StatusBar.currentHeight || 0
          : 0
        : 0

    return Math.ceil(height) - tabBarHeight + additionalHeight
  }, [height, tabBarHeight])

  const [currIdx, setCurrIdx] = useDebounceValue(0)

  const [shareModalVisible, setShareModalVisible] = useState(false)
  const [moreModalVisible, setMoreModalVisible] = useState(false)

  const [scrollEnable, setScrollEnable] = useState(true)

  const controllerValue = useMemo(() => {
    return {
      shareModal: setShareModalVisible,
      moreModal: setMoreModalVisible,
    }
  }, [])

  return (
    <HomeModalControllerContext.Provider value={controllerValue}>
      <FlatList
        className="h-full"
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        snapToInterval={videoHeight}
        disableIntervalMomentum={true}
        scrollEnabled={scrollEnable}
        onMomentumScrollEnd={event => {
          const calcIdx = Math.round(
            event.nativeEvent.contentOffset.y / videoHeight,
          )
          setCurrIdx(calcIdx)
        }}
        data={videos}
        keyExtractor={item => item.id}
        renderItem={item => {
          console.log(item)
          return (
            <HomeVideoCard
              vidItem={item.item}
              videoHeight={videoHeight}
              isFocused={tabFocused && item.index === currIdx}
              setScrollEnable={setScrollEnable}
            />
          )
        }}
        initialNumToRender={5}
      />

      <VideoShareModal
        shareModalController={[shareModalVisible, setShareModalVisible]}
      />

      <SwipableModal stateController={[moreModalVisible, setMoreModalVisible]}>
        <ModalSettingsBtn>QR Code</ModalSettingsBtn>
        <ModalSettingsBtn>Report Video</ModalSettingsBtn>
      </SwipableModal>
    </HomeModalControllerContext.Provider>
  )
}

export default Home
