// REFERENCE: For Users - Business Account (Notifications)

import SettingIcon from "assets/icons/Setting"
import SwipeableNotice from "components/notification/SwipeableNotice"
import LatoText from "components/styled_components/LatoText"
import RootTabLayout from "components/styled_components/RootTabLayout"
import React from "react"
import { SafeAreaView, ScrollView, View } from "react-native"

const Notifications: React.FC = () => {
  return (
    <RootTabLayout>
      <SafeAreaView className="bg-background h-full">
        <View className="flex-row justify-between py-6 px-8">
          <LatoText classname={`font-[18px] font-lato-bold`}>
            Notifications
          </LatoText>
          <View className="flex-row">
            <LatoText
              classname={`text-secondary mr-4 text-[14px] text-center font-lato-bold self-center `}
            >
              Mark all as read
            </LatoText>
            <SettingIcon />
          </View>
        </View>
        <ScrollView className={"w-full"}>
          {[1, 2, 3].map((item, index) => {
            return <SwipeableNotice key={index} />
          })}
        </ScrollView>
      </SafeAreaView>
    </RootTabLayout>
  )
}

export default Notifications
