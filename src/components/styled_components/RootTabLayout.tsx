import React from "react"
import { Platform, SafeAreaView, StatusBar } from "react-native"
import customTwMerge from "utils/CustomTwMerge"

type TRootTabLayout = {
  children: string | JSX.Element | JSX.Element[]
  classname?: string
}

const RootTabLayout: React.FC<TRootTabLayout> = ({
  children,
  classname = "",
}) => {
  return (
    <SafeAreaView
      className={customTwMerge("h-full bg-background", classname)}
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      {children}
    </SafeAreaView>
  )
}

export default RootTabLayout
