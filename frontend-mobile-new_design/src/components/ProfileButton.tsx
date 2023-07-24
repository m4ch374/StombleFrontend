import React from 'react'
import {useState} from 'react'
import { Pressable, Text } from 'react-native'

type profileButtonProps={
    width?:number
    height?:number
    bgColor?: string
    text:string,
    onPress?:()=>void
    
}
const ProfileButton = ({height=24,width=163,bgColor='#3D3D5D',onPress,text}:profileButtonProps) => {
  // const [press, setPress] = useState(false)
  // if(press){
  //   bgColor==='#326FCB'
  // }
  return (
    <Pressable 
        onPress={onPress} 
        className="rounded-[5px] justify-center items-center"
        style={{backgroundColor:bgColor,height:height}
      }
    >
      <Text className='text-[12px] py-[5px] px-[48.5px] text-[#FFFFFF]' style={{fontFamily:'Lato-400'}}>
        {text}
      </Text>
    </Pressable> 
  )
}

export default ProfileButton