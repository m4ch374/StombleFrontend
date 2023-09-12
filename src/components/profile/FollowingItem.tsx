import AccountFileCard from "components/AccountFileCard"
import LatoText from "components/styled_components/LatoText"
import React, { useCallback, useState } from "react"
import { View, Pressable, Text } from "react-native"
import customTwMerge from "utils/CustomTwMerge"

const followingStlye = "border border-white"
const notFollowedStlye = "bg-primary"

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
      className={customTwMerge(
        "h-25 flex-row justify-between items-center",
        classname,
      )}
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
        <View className="flex-col justify-center h-ful">
          <Text className="lato-text font-lato-bold text-sm">
            {businessName}
          </Text>
          <LatoText classname="text-7 text-gray-lighter">
            Subtext for the business goes here.
          </LatoText>
        </View>
      </View>

      {/* Items center does not work if View is not here, wacky */}
      <View>
        <Pressable
          onPress={handleToggle}
          className={`
            w-[76px]
            h-[32px]
            flex
            justify-center
            items-center
            rounded-sm
            ${following ? followingStlye : notFollowedStlye}
          `}
        >
          <LatoText classname="font-lato-bold text-6">
            {following ? "Following" : "Follow"}
          </LatoText>
        </Pressable>
      </View>
    </View>
  )
}

export default FollowingItem
