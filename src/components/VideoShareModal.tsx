import React, { Dispatch, SetStateAction, useMemo } from "react"
import SwipableModal from "./styled_components/SwipableModal"
import { FlatList, Text, View } from "react-native"
import CopyLinkIcon from "assets/icons/CopyLinkIcon"
import FacebookIcon from "assets/icons/FacebookIcon"
import WhatsappIcon from "assets/icons/WhatsappIcon"

type TShareItem = {
  title: string
  Icon: React.FC
}

const ShareItem: React.FC<TShareItem> = ({ title, Icon }) => {
  return (
    <View className="flex items-center px-sm">
      <Icon />
      <Text className="lato-text text-sm">{title}</Text>
    </View>
  )
}

type TVideoShareModal = {
  shareModalController: [boolean, Dispatch<SetStateAction<boolean>>]
}

const VideoShareModal: React.FC<TVideoShareModal> = ({
  shareModalController,
}) => {
  const iconMappings: { [key: string]: () => JSX.Element } = useMemo(() => {
    return {
      link: () => <CopyLinkIcon classname="h-[48px]" />,
      sms: () => <CopyLinkIcon classname="h-[48px]" />,
      instagram: () => <CopyLinkIcon classname="h-[48px]" />,
      facebook: () => <FacebookIcon classname="h-[48px]" />,
      whatsapp: () => <WhatsappIcon classname="h-[48px]" />,
    }
  }, [])

  const shareItems = useMemo(() => {
    return ["Link", "SMS", "Instagram", "Facebook", "WhatsApp"].map(x => {
      return {
        title: x,
        icon: iconMappings[x.toLowerCase()] as React.FC,
      }
    })
  }, [iconMappings])

  return (
    <SwipableModal stateController={shareModalController}>
      <Text className="lato-text text-gray-lighter">Share video to</Text>

      <FlatList
        data={shareItems}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={item => (
          <ShareItem title={item.item.title} Icon={item.item.icon} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="py-md"
      />
    </SwipableModal>
  )
}

export default VideoShareModal
