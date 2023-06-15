import { View, Text } from 'react-native'
import React from 'react'
import FlatButton from '../style/FlatButton'

type Props = {}

const WelcomeModal = (props: Props) => {
  return (
    <View className='flex-1 p-[16px] items-center justify-center bg-[#00000080]'>
      <View className='mb-[16px]'>
        <Text className='text-white text-[24px]' 
          style={{fontFamily:'Lato-900'}}>
          Welcome to Stomble!
        </Text>
      </View>

      <View className='mb-[60px]'>
      <Text className='text-white text-center px-[20px] text-[14px]' 
        style={{fontFamily:'Lato-400'}}>
        Wanna learn new skill? A world of skills awaits! Welcome to the journey!
      </Text>
      </View>

      <View className="mb-[16px] w-full">
            <FlatButton
              text="GET STARTED"
              onPress={()=>{}}
            />
      </View>
    </View>
  )
}

export default WelcomeModal