import { View, Text } from 'react-native'
import React from 'react'
import BackgroundColor from '../../../style/BackgroundColor'

type Props = {}

const Following = (props: Props) => {
  return (
    <BackgroundColor>
    <View className='flex-1 p-10'>
      <Text className='text-white text-[18px]' style={{fontFamily:'Lato-700'}}></Text>
      <Text className='text-[#ffffff60] text-[12px] text-center' style={{fontFamily:'Lato-400'}}>
      You haven't followed any business yet. But No worries below are some suggestions for you
      </Text>
    </View>
    </BackgroundColor>
  )
}

export default Following