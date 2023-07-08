import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'

interface SmallButtonProps {
  width?: string | number | undefined
  height?: string | number | undefined
  bgColor?: string
  text: string
  onPress?: () => void
}

const SmallButton = ({
  width,
  height,
  bgColor,
  text,
  onPress,
}: SmallButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='rounded-md justify-center items-center'
      style={{
        backgroundColor: bgColor ? bgColor : 'rgba(199, 199, 199, 0.5)',
        width: width ? width : 52,
        height: height ? height : 32,
      }}
    >
      <Text
        className='text-xs py-1.5 px-3 text-white'
        style={{ fontFamily: 'Lato-400' }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default SmallButton
