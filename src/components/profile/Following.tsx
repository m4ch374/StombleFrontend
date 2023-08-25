import React, { useContext, useEffect, useState } from "react"
import FollowingItem from "./FollowingItem"
import { ScrollRefreshChildScroll } from "components/styled_components/ScrollRefresh"
import { DataContext } from "screens/login_root/Profile"
import { View } from "react-native"
import { useAppSlector } from "redux/hooks"

const Following: React.FC = () => {
  const data = useContext(DataContext)

  const [items, setItems] = useState<typeof data>()

  useEffect(() => {
    setItems(data)
  }, [data])

  const token = useAppSlector(state => state.tokens.currentToken)
  useEffect(() => {
    console.log(token)
  }, [token])

  return (
    <ScrollRefreshChildScroll classname="bg-bgProfile">
      <View>
        {typeof items !== "undefined" &&
          items.result.map(d => {
            return (
              <FollowingItem
                key={d.id}
                classname="my-2 px-2"
                businessName={d.business_account.businessName}
                businessId={d.business_account_id}
              />
            )
          })}
      </View>

      {/* For demonstrating purposes */}
      <View>
        {[...Array(10).keys()].map((_, idx) => {
          return (
            <FollowingItem
              key={idx}
              classname="my-2 px-2"
              businessName="Placeholder"
              businessId=""
            />
          )
        })}
      </View>
    </ScrollRefreshChildScroll>
  )
}

export default Following
