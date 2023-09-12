import SwipableModal from "components/styled_components/SwipableModal"
import React, { useMemo } from "react"
import ModalSettingsBtn from "./ModalSettingsBtn"
import FieldSeperator from "components/FieldSeperator"
import {
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import CopyLinkIcon from "assets/icons/CopyLinkIcon"
import FacebookIcon from "assets/icons/FacebookIcon"
import WhatsappIcon from "assets/icons/WhatsappIcon"
import Modal from "react-native-modal"

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

type TVideoPreviewPopupGroup = {
  previewModalController: {
    previewCardController: [
      boolean,
      React.Dispatch<React.SetStateAction<boolean>>,
    ]
    shareModalController: [
      boolean,
      React.Dispatch<React.SetStateAction<boolean>>,
    ]
    removeModalController: [
      boolean,
      React.Dispatch<React.SetStateAction<boolean>>,
    ]
  }
}

const VideoPreviewPopupGroup: React.FC<TVideoPreviewPopupGroup> = ({
  previewModalController,
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

  const { previewCardController, removeModalController, shareModalController } =
    previewModalController

  return (
    <>
      <SwipableModal stateController={previewCardController}>
        <ModalSettingsBtn
          onPress={() => {
            previewCardController[1](false)
            shareModalController[1](true)
          }}
        >
          Share Video
        </ModalSettingsBtn>

        <FieldSeperator />

        <ModalSettingsBtn
          onPress={() => {
            previewCardController[1](false)
            removeModalController[1](true)
          }}
        >
          Remove Video
        </ModalSettingsBtn>

        <FieldSeperator />

        <ModalSettingsBtn
          onPress={() => {
            previewCardController[1](false)
          }}
        >
          Cancel
        </ModalSettingsBtn>
      </SwipableModal>

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

      <Modal
        isVisible={removeModalController[0]}
        statusBarTranslucent={true}
        backdropOpacity={0.7}
        onBackButtonPress={() => removeModalController[1](false)}
        className="w-full p-0 m-0"
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <TouchableWithoutFeedback
          onPress={() => removeModalController[1](false)}
        >
          <View className="flex-1 items-center w-full h-full justify-center bg-transparent">
            <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
              <View className="w-[300px] h-[216px] bg-gray-darkest-pro-max rounded-md flex items-center">
                <Text className="lato-text font-lato-bold my-lg">
                  Remove Video?
                </Text>

                <Text className="lato-text text-center text-gray-lighter pb-md">
                  Are you sure you want to remove this video from your saved
                  videos?
                </Text>

                <FieldSeperator />
                <TouchableOpacity className="w-full items-center flex-1 justify-center">
                  <Text className="lato-text font-lato-bold text-util-error">
                    Remove
                  </Text>
                </TouchableOpacity>

                <FieldSeperator />

                <TouchableOpacity
                  className="w-full items-center justify-center flex-1"
                  onPress={() => {
                    removeModalController[1](false)
                  }}
                >
                  <Text className="lato-text font-lato-bold">Caccel</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}

export default VideoPreviewPopupGroup
