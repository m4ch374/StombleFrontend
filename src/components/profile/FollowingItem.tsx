import AccountFileCard from "components/AccountFileCard"
import React, { useCallback, useState } from "react"
import { View, Text, Pressable } from "react-native"

const followingStlye = "border border-white"
const notFollowedStlye = "bg-blue-500"

type TFollowingItem = {
  classname?: string
  businessName: string
  businessId: string
}

const FollowingItem: React.FC<TFollowingItem> = ({
  classname = "",
  businessName,
  businessId,
}) => {
  const [following, setFollowing] = useState(true)

  const handleToggle = useCallback(() => {
    if (businessId) {
      console.log(businessId)
    }

    setFollowing(state => !state)
  }, [businessId])

  const profileHeaderPlaceholder =
    "https://stomble-users.s3.ap-southeast-2.amazonaws.com/null"

  return (
    <View
      className={`
        h-[50px] flex-row justify-between items-center ${classname}
      `}
    >
      <View className="h-full flex-row">
        <View>
          <AccountFileCard
            uri={profileHeaderPlaceholder}
            height={50}
            width={50}
            borderRadius={50}
          />
        </View>
        <View className="h-full w-[155px]">
          <Text className="font-LatoBold text-white">{businessName}</Text>
          <Text className="font-Lato text-suggestive mt-1">
            Subtext for the business goes here
          </Text>
        </View>
      </View>

      {/* Items center does not work if View is not here, wacky */}
      <View>
        <Pressable
          onPress={handleToggle}
          className={`
            w-[75px]
            h-[24px]
            flex
            justify-center
            items-center
            rounded-md
            ${following ? followingStlye : notFollowedStlye}
          `}
        >
          <Text className="font-LatoBold text-white text-[12px]">
            {following ? "Following" : "Follow"}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default FollowingItem
