import { View, Text, Pressable,Image } from 'react-native'
import React,{useState} from 'react'
import UseEffectSkipInitial from '../hooks/UseEffectSkipInitial'


type Props ={
    type:string,
    uri?:string,
    sourceImage?: any
    onPress?:()=>void,
    selectedItem?:string
}

const AccountTypeCard = ({type,uri,selectedItem,onPress,sourceImage}: Props) => {
    
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={{backgroundColor: selectedItem === type ? '#0B52BC' : '#232637'}}
        className='h-[10px] w-[10px] rounded-[50px] justify-center items-center mb-[15px]'>
        <Image
          className='w-[30px] h-[30px] rounded-[15px]'
          source={uri ? {uri: uri} : sourceImage}
        />
      </Pressable>
      
      <Text className='text-white text-[18px] text-center'>{type}</Text>
    </View>
  );
}

export default AccountTypeCard