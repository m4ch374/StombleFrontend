import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = 
{
    setModalVisible:React.Dispatch<React.SetStateAction<boolean>>
}

const QRModal = ({setModalVisible}: Props) => {
  return (
    <View className='h-[400px] bg-red-300'>
        <Pressable onPress={()=>setModalVisible(false)}>
          <Text className='text-white text-[20px]'>QRModal</Text>       
        </Pressable>
    </View>
  )
}

export default QRModal
