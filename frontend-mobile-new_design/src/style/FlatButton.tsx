import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { color } from 'react-native-reanimated'

type FlatButtonProps={
    height?: string | number | undefined
    bgColor?: string
    text:string,
    onPress:any
    disabled?:boolean
    
}
const FlatButton = ({height, text,onPress,disabled, bgColor}:FlatButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='rounded-[5px] justify-center items-center '
      style={{
        backgroundColor: disabled ? '#454545' : bgColor || '#0B52BC',
        height: height ? height : 48,

      }}>
      <Text className='text-[17px] text-white' style={{fontFamily: 'Lato-700'}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default FlatButton