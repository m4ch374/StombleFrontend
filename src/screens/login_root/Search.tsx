// REFERENCE: PLACEHOLDER
import { SearchInput } from "components/styled_components"
import { FollowItem } from "components/common"
import React, { useState, useEffect, useCallback } from "react"
import { View, Text, Pressable, ScrollView } from "react-native"

import { searchBusinessesAndVideos } from "utils/services/searching"
import {
  BusinessAccountsWithFollowStatusRes,
  VideosWithBusinessAndLikedStatus,
} from "types/endpoints"

const skipInitial = 0
const takeInitial = 9

const Search: React.FC = () => {
  const [text, setText] = useState("")
  const [businessSkip, setBusinessSkip] = useState(skipInitial)
  const [businessTake] = useState(takeInitial)
  const [business, setBusiness] = useState<
    BusinessAccountsWithFollowStatusRes[]
  >([])
  const [videos, setVideos] = useState<VideosWithBusinessAndLikedStatus[]>([])

  console.log("I have to log this to commit code:", videos.length)

  const fetchVideosOrBusiness = useCallback(
    (_query: string, _businessSkip: number) => {
      const params = {
        query: _query,
        businessAccountSkip: _businessSkip,
        businessAccountTake: businessTake,
      }

      ;(async () => {
        const resp = await searchBusinessesAndVideos(params)

        if (typeof resp === "undefined") return

        if (_businessSkip !== +skipInitial) {
          setBusiness(state => [
            ...state,
            ...resp?.result?.businessAccountsWithFollowStatus,
          ])
          setVideos(state => [
            ...state,
            ...resp?.result?.videosWithBusinessAndLikedStatus,
          ])
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
      fetchVideosOrBusiness(text, +skipInitial)
    }, 600)
    return () => clearTimeout(timeOutId)
  }, [fetchVideosOrBusiness, text])

  const seeMore = () => {
    setBusinessSkip(businessSkip + takeInitial)
    fetchVideosOrBusiness(text, businessSkip + takeInitial)
  }

  const deleteSearch = () => {
    setText("")
    setBusiness([])
  }

  const isSeeMoreSeen = (business?.length || 0) % +takeInitial

  return (
    <View className="bg-background h-full p-6">
      <SearchInput
        onChangeText={setText}
        value={text}
        placeholder="Search"
        removeText={deleteSearch}
      />
      <ScrollView className="flex-1">
        <View className="pt-10">
          <Text className="text-[14px] text-gray-lighter font-Lato">
            Accounts
          </Text>
          {business?.map((_business, i) => {
            return (
              <FollowItem
                key={`${_business.id}-${i}`}
                classname="my-sm px-sm"
                businessName={_business.businessName}
                businessId={_business.id}
                amountFollowers={_business.amount_followers}
                isFollowing={Boolean(
                  _business.business_account_id_to_business_account_id.length,
                )}
              />
            )
          })}
          {!isSeeMoreSeen && business?.length ? (
            <Pressable
              onPress={() => seeMore()}
              className={`
                justify-center
                items-center
                p-2
              `}
            >
              <Text className="text-[14px] text-[#5D9BF8]">See more</Text>
            </Pressable>
          ) : null}
        </View>
      </ScrollView>
    </View>
  )
}

export default Search
