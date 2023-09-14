// REFERENCE: PLACEHOLDER
import { SearchInput } from "components/styled_components"
import { searchingEP } from "constants/Endpoint"
import { FollowItem, VideoItemCard } from "components/common"
import React, { useState, useEffect, useCallback } from "react"
import { View, Text, Pressable, ScrollView } from "react-native"

import { searchBusinessesAndVideos } from "utils/services/searching"
import {
  BusinessAccountsWithFollowStatusRes,
  VideosWithBusinessAndLikedStatus,
} from "types/endpoints"
import {
  followBusiness,
  likeVideo,
  unfollowBusiness,
  unlikeVideo,
} from "utils/services/videoPlay"

const skipInitial = 0
const takeInitial = 8

const Search: React.FC = () => {
  const [text, setText] = useState("")
  const [businessSkip, setBusinessSkip] = useState(skipInitial)
  const [businessTake] = useState(takeInitial)
  const [videosSkip, setVideosSkip] = useState(skipInitial)
  const [videosTake] = useState(takeInitial)
  const [business, setBusiness] = useState<
    BusinessAccountsWithFollowStatusRes[]
  >([])
  const [videos, setVideos] = useState<VideosWithBusinessAndLikedStatus[]>([])

  const fetchVideosOrBusiness = useCallback(
    (
      _query: string,
      _businessSkip: number,
      _videoSkip: number,
      more?: string,
    ) => {
      const path = `${searchingEP.SEARCH_BUSINESSES_AND_VIDEOS}`
      const query = `query=${_query}`
      const businessAccountSkip = `businessAccountSkip=${_businessSkip}`
      const businessAccountTake = `businessAccountTake=${businessTake}`
      const videoSkip = `videoSkip=${_videoSkip}`
      const videoTake = `videoTake=${videosTake}`
      const url = `${path}?${query}&${businessAccountSkip}&${businessAccountTake}&${videoSkip}&${videoTake}`
      ;(async () => {
        const resp = await searchBusinessesAndVideos(url)

        if (typeof resp === "undefined") return

        if (_businessSkip !== skipInitial || _videoSkip !== skipInitial) {
          if (more == "business") {
            setBusiness(state => [
              ...state,
              ...resp?.result?.businessAccountsWithFollowStatus,
            ])
          } else if (more == "videos") {
            setVideos(state => [
              ...state,
              ...resp?.result?.videosWithBusinessAndLikedStatus,
            ])
          } else if (more == "update") {
            setBusiness(resp?.result?.businessAccountsWithFollowStatus)
            setVideos(resp?.result?.videosWithBusinessAndLikedStatus)
          }
        } else {
          setBusiness(resp?.result?.businessAccountsWithFollowStatus || [])
          setVideos(resp?.result?.videosWithBusinessAndLikedStatus || [])
        }
      })()
    },
    [],
  )

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setBusinessSkip(skipInitial)
      setVideosSkip(skipInitial)
      fetchVideosOrBusiness(text, skipInitial, skipInitial)
    }, 600)
    return () => clearTimeout(timeOutId)
  }, [fetchVideosOrBusiness, text])

  const seeMoreBusiness = () => {
    setBusinessSkip(businessSkip + takeInitial)
    fetchVideosOrBusiness(
      text,
      businessSkip + takeInitial,
      videosSkip,
      "business",
    )
  }

  const seeMoreVideos = () => {
    setVideosSkip(videosSkip + takeInitial)
    fetchVideosOrBusiness(
      text,
      businessSkip,
      videosSkip + takeInitial,
      "videos",
    )
  }

  const deleteSearch = () => {
    setText("")
    setBusiness([])
    setVideos([])
  }

  const onLikeVideo = async (
    video: VideosWithBusinessAndLikedStatus,
    like: boolean,
  ) => {
    if (like) {
      video.videos_liked = [{ videos_id: "" }]
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const videosUpdated: VideosWithBusinessAndLikedStatus[] = JSON.parse(
        JSON.stringify(videos),
      )
      setVideos(videosUpdated)

      const resp = await likeVideo({ videoId: video.id })

      if (typeof resp === "undefined") {
        video.videos_liked = []
        setVideos(videos)
        return
      }
    } else {
      video.videos_liked = []
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const videosUpdated: VideosWithBusinessAndLikedStatus[] = JSON.parse(
        JSON.stringify(videos),
      )
      setVideos(videosUpdated)

      const resp = await unlikeVideo({ videoId: video.id })

      if (typeof resp === "undefined") {
        video.videos_liked = [
          { videos_id: video.videos_liked[0]?.videos_id || "" },
        ]
        setVideos(videos)
        return
      }
    }
  }

  const onFollowingBusiness = async (
    _business: BusinessAccountsWithFollowStatusRes,
    follow: boolean,
  ) => {
    if (follow) {
      _business.amount_followers = _business.amount_followers + 1
      _business.business_account_id_to_business_account_id = [
        { business_account_id: "" },
      ]
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const businessUpdated: BusinessAccountsWithFollowStatusRes[] = JSON.parse(
        JSON.stringify(business),
      )
      setBusiness(businessUpdated)

      const resp = await followBusiness({ businessToFollowing: _business.id })

      if (typeof resp === "undefined") {
        _business.business_account_id_to_business_account_id = []
        _business.amount_followers = _business.amount_followers - 1
        setBusiness(business)
        return
      }
    } else {
      _business.business_account_id_to_business_account_id = []
      _business.amount_followers = _business.amount_followers - 1
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const businessUpdated: BusinessAccountsWithFollowStatusRes[] = JSON.parse(
        JSON.stringify(business),
      )
      setBusiness(businessUpdated)

      const resp = await unfollowBusiness({ businessToFollowing: _business.id })

      if (typeof resp === "undefined") {
        _business.amount_followers = _business.amount_followers + 1
        _business.business_account_id_to_business_account_id = [
          {
            business_account_id:
              _business.business_account_id_to_business_account_id[0]
                ?.business_account_id,
          },
        ]
        setBusiness(business)
        return
      }
    }
  }

  const isSeeMoreBusinessSeen = (business?.length || 0) % takeInitial
  const isSeeMoreVideosSeen = (videos?.length || 0) % takeInitial

  return (
    <View className="bg-background h-full p-6">
      <SearchInput
        onChangeText={setText}
        value={text}
        placeholder="Search"
        removeText={deleteSearch}
      />
      <ScrollView>
        <View className="flex-1">
          <View className="pt-5">
            {business?.length ? (
              <Text className="text-[14px] text-gray-lighter font-Lato">
                Accounts
              </Text>
            ) : null}
            {business?.map((_business, i) => {
              return (
                <FollowItem
                  key={`${_business.id}-${i}`}
                  classname="my-sm px-sm"
                  businessName={_business.businessName}
                  amountFollowers={_business.amount_followers}
                  onFollowBusiness={follow =>
                    void onFollowingBusiness(_business, follow)
                  }
                  isFollowing={Boolean(
                    _business.business_account_id_to_business_account_id.length,
                  )}
                />
              )
            })}
            {!isSeeMoreBusinessSeen && business?.length ? (
              <Pressable
                onPress={() => seeMoreBusiness()}
                className={`
                  justify-center
                  items-center
                  p-2
                `}
              >
                <Text className="text-[14px] text-[#5D9BF8]">
                  See more business
                </Text>
              </Pressable>
            ) : null}
          </View>
        </View>
        <View className="flex-1 pt-3">
          {videos?.length ? (
            <Text className="text-[14px] text-gray-lighter font-Lato mb-5">
              Videos
            </Text>
          ) : null}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {videos?.map((video, i) => {
              return (
                <VideoItemCard
                  key={`${video.id}-${i}`}
                  coverUrl={video.link_cover}
                  videoUrl={video.link_video}
                  businessName={video?.business_account?.businessName}
                  videosLiked={Boolean(video?.videos_liked?.length)}
                  onLikeVideos={value => void onLikeVideo(video, value)}
                />
              )
            })}
          </View>
          {!isSeeMoreVideosSeen && videos?.length ? (
            <Pressable
              onPress={() => seeMoreVideos()}
              className={`
                justify-center
                items-center
                p-2
              `}
            >
              <Text className="text-[14px] text-[#5D9BF8]">
                See more videos
              </Text>
            </Pressable>
          ) : null}
        </View>
      </ScrollView>
    </View>
  )
}

export default Search
