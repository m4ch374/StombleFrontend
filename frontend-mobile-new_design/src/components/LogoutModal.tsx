import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp } from '@react-navigation/native'
import { AuthStackList } from '../navigation/Navigation.interface'

type Props = 
{

  setLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: NativeStackNavigationProp<AuthStackList, 'LogoutModal'>;

};

const RemoveAccountModal = ({setLogoutModal,navigation}: Props) => {
    const handleLogout=()=>{
      setLogoutModal(false)
      navigation.navigate('LandingWithAccount')
    }
  return (
    <View className='h-[214px] w-[290px] bg-[#252525] rounded-[10px]'>
      <Text className='text-white text-[20px] mt-[32px] text-center' style={{fontFamily:'Lato-700'}}>
        Logout of Johan ?
      </Text>

      <Text className='text-[#ffffff70] text-[16px] my-[16px] text-center px-[14px]' style={{fontFamily:'Lato-400'}}>
      You will have to re-login to access the account again.
      </Text>

      <View className='flex w-full h-[94px]'>
        <Pressable onPress={handleLogout} className='flex-1 justify-center'>
            <View className='h-[0.5px] w-full bg-[#ffffff10]'/>
            <Text className='text-[#F4222F] text-center text-[16px] py-[10px]' style={{fontFamily:"Lato-700"}}>
                Log out
            </Text>
            <View className='h-[0.5px] w-full bg-[#ffffff10]'/>
        </Pressable>

        <Pressable onPress={()=>setLogoutModal(false)} className='flex-1 justify-center'>
            <Text className='text-white text-center text-[16px] py-[10px]' style={{fontFamily:"Lato-700"}}>
                Cancel
            </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default RemoveAccountModal

const styles = StyleSheet.create({})