import React, { useCallback, useEffect, useMemo, useState } from "react"
import FollowingItem from "./FollowingItem"
import { RefreshControl } from "react-native"
import { useAppDispatch, useAppSlector } from "redux/hooks"
import { Tabs } from "react-native-collapsible-tab-view"
import { getFollowings } from "utils/services/profile"
import { TGetFollowings } from "types/endpoints"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import FieldSeperator from "components/FieldSeperator"

const Following: React.FC = () => {
  const dispatch = useAppDispatch()

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
      const params = { take: 10 }
      const resp = await getFollowings(params)
      setRefresh(false)

      if (typeof resp === "undefined") return

      setData({
        result: [...resp.result],
      })
    })()
  }, [])

  useEffect(() => {
    dispatch(tmpStoreAction.setItem("numFollowing", data.result.length))
  }, [data.result, dispatch])

  useEffect(() => {
    handleRefresh()
  }, [handleRefresh])

  const token = useAppSlector(state => state.tokens.currentToken)
  useEffect(() => {
    console.log(token)
  }, [token])

  return (
    <Tabs.FlatList
      data={data?.result}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={item => (
        <FollowingItem
          classname="px-sm my-sm"
          businessName={item.item.business_account.businessName}
          businessId={item.item.business_account_id}
        />
      )}
      ItemSeparatorComponent={() => <FieldSeperator />}
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
