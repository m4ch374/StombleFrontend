import { Text, View } from 'react-native'
import React from 'react'
import BackgroundColor from '../../../style/BackgroundColor'

type Props = {}

const History = (props: Props) => {
  return (
    <BackgroundColor>
    <View className='flex-1 p-10'>
      <Text className='text-white text-[18px]' style={{fontFamily:'Lato-700'}}></Text>
      <Text className='text-[#ffffff] text-[12px] text-center' style={{fontFamily:'Lato-400'}}>
        History
      </Text>
    </View>
    </BackgroundColor>
  )
}

export default History
