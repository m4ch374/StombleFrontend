import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import SmallButton from '../style/SmallButton'
import { set } from 'react-native-reanimated'

type Props = {
  setModalVisible:React.Dispatch<React.SetStateAction<boolean>>
}

const RemoveAccountModal = ({setModalVisible}: Props) => {
    const handleRemove=()=>{

    }
  return (
    <View className='h-[205px] w-[290px] bg-[#252525] rounded-[10px]'>
      <Text className='text-white text-[20px] mt-[32px] text-center' style={{fontFamily:'Lato-900'}}>
        Remove account?
      </Text>

      <Text className='text-white text-[16px] my-[16px] text-center px-[14px]' style={{fontFamily:'Lato-400'}}>
        You'll need to enter your username and password the next time you want to log in
      </Text>

      <View className='flex-row h-[42px] mt-[14px]'>
        <Pressable onPress={()=>setModalVisible(false)} className='flex-1 justify-center border-t-[0.5px] border-r-[0.5px] border-[#ffffff10]'>
            <Text className='text-[#326FCB] text-center text-[16px] py-[10px]' style={{fontFamily:"Lato-700"}}>
                Cancel
            </Text>
        </Pressable>
        <Pressable onPress={handleRemove} className='flex-1 justify-center border-t-[0.5px] border-[#ffffff10]'>
            <Text className='text-[#F4222F] text-center text-[16px] py-[10px]' style={{fontFamily:"Lato-700"}}>
                Remove
            </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default RemoveAccountModal

const styles = StyleSheet.create({})