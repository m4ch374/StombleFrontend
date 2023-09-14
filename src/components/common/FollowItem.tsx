import React from "react"
import AccountFileCard from "components/AccountFileCard"
import LatoText from "components/styled_components/LatoText"
import { View, Pressable, Text } from "react-native"
import customTwMerge from "utils/CustomTwMerge"

const followingStlye = "border border-white"
const notFollowedStlye = "bg-primary"

type TFollowItem = {
  classname?: string
  businessName: string
  businessId?: string
  amountFollowers?: string | number
  isFollowing?: boolean
  onFollowBusiness: (follow: boolean) => void
}

const FollowItem: React.FC<TFollowItem> = ({
  classname = "",
  businessName,
  amountFollowers,
  isFollowing,
  onFollowBusiness,
}) => {
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
        <View className="h-full w-[155px]">
          <Text className="lato-text font-lato-bold">{businessName}</Text>
          <LatoText classname="text-6 text-gray-lighter">
            {`${amountFollowers || 0} Followers`}
          </LatoText>
        </View>
      </View>

      <View>
        <Pressable
          onPress={() => onFollowBusiness(!isFollowing)}
          className={`
            w-[75px]
            h-[24px]
            flex
            justify-center
            items-center
            rounded-md
            ${isFollowing ? followingStlye : notFollowedStlye}
          `}
        >
          <LatoText classname="font-lato-bold text-6">
            {isFollowing ? "Following" : "Follow"}
          </LatoText>
        </Pressable>
      </View>
    </View>
  )
}

export default FollowItem
