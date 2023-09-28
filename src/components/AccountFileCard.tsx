// What the fuck is this
// Code from shadow realm
import React from "react"

import {
  View,
  Text,
  Image,
  ImageResizeMode,
  TouchableOpacity,
  ImageBackground,
} from "react-native"

type Props = {
  text?: string
  category?: string
  uri: string | undefined
  height?: number | undefined
  width?: number | undefined
  onPress?: () => void
  borderRadius?: number
  imageFit?: ImageResizeMode | undefined
  style?: string
}

const AccountFileCard: React.FC<Props> = ({
  text,
  uri,
  height,
  width,
  onPress,
  category,
  borderRadius,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1.0} className="flex-1">
      <View className={style ? style : "flex-row gap-[16px]"}>
        <View
          className="justify-center items-center drop-shadow-3xl overflow-hidden"
          style={{
            height: height ? height : 48,
            width: width ? width : 48,
            borderRadius: borderRadius ? borderRadius : 5,
          }}
        >
          <ImageBackground
            // TODO: replace with a svg default icon
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            source={require("assets/user_icon.png")}
            resizeMode="cover"
            className="flex-1 justify-center h-full w-full "
          >
            <Image
              source={{ uri: uri }}
              style={{
                height: height ? height : 48,
                width: width ? width : 48,
                resizeMode: "cover",
              }}
            />
          </ImageBackground>
        </View>

        <View className="flex gap-[4px]">
          {text ? (
            <View className="mx-auto">
              <Text className="text-[14px] text-[#FFFFFF]">{text}</Text>
            </View>
          ) : null}
          {category ? (
            <View className="mx-auto">
              <Text className="text-[12px] text-[#FFFFFF60]">{category}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default AccountFileCard
