import React, { useCallback, useEffect, useMemo, useState } from "react"
import FollowingItem from "./FollowingItem"
import { RefreshControl, View } from "react-native"
import { useAppSlector } from "redux/hooks"
import { Tabs } from "react-native-collapsible-tab-view"
import { getFollowings } from "utils/services/profile"
import { TGetFollowings } from "types/endpoints"

const Following: React.FC = () => {
  const defaultData = useMemo(() => {
    return [...Array(20).keys()].map(() => {
      return {
        business_account: {
          id: "",
          businessName: "Placeholder",
          amount_followers: 0,
          amount_following: 0,
          amount_videos: 0,
          created_at: "",
          email: "",
          link_icon: "a",
          status: "",
          updated_at: "",
          user_id: "",
        },
        business_account_id: "",
        created_at: "",
        follow_business_account_id: "",
        follow_user_account_id: "",
        id: "",
        updated_at: "",
        user_account_id: "",
      }
    })
  }, [])

  const [data, setData] = useState<TGetFollowings["responseType"]>({
    result: [...defaultData],
  })

  const [refresh, setRefresh] = useState(false)

  const handleRefresh = useCallback(() => {
    ;(async () => {
      const resp = await getFollowings()
      setRefresh(false)

      if (typeof resp === "undefined") return

      setData({
        result: [...resp.result, ...defaultData],
      })
    })()
  }, [defaultData])

  useEffect(() => {
    handleRefresh()
  }, [handleRefresh])

  const token = useAppSlector(state => state.tokens.currentToken)
  useEffect(() => {
    console.log(token)
  }, [token])

  return (
    <Tabs.FlatList
      data={data.result}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={item => (
        <FollowingItem
          classname="px-sm my-sm"
          businessName={item.item.business_account.businessName}
          businessId={item.item.business_account_id}
        />
      )}
      ItemSeparatorComponent={() => (
        <View className="h-[1px] w-full border-t border-t-gray-lightest/10" />
      )}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => {
            setRefresh(true)
            handleRefresh()
          }}
        />
      }
    />
  )
}

export default Following
