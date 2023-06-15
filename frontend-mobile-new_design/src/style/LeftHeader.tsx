import { Pressable } from 'react-native'
import React from 'react'
import { Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// type Props = {
//     title:string
// }

const LeftHeader = () => {
  const navigation=useNavigation()
  return (  
    <Pressable className='flex-row h-full w-[50px]' onPress={()=>navigation.goBack()} >
        <Fontisto name="angle-left" size={16} color="#FFFFFF" />
        {/* <Text className='text-[#FFFFFF] text-[16px] ml-[20px]'
        style={{fontFamily:'Lato-700'}}>
          {title}
        </Text> */}
    </Pressable>
  )
}

export default LeftHeader