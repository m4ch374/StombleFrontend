import { View, Text } from 'react-native'
import React from 'react'
import BackgroundColor from '../../../style/BackgroundColor'

type Props = {}

const Liked = (props: Props) => {
  return (
    <BackgroundColor>
    <View className='p-11 flex-2'>
      <Text className='text-white'>Sorry! No Videos yet</Text>
      <Text></Text>
    </View>
    </BackgroundColor>
  )
}

export default Liked