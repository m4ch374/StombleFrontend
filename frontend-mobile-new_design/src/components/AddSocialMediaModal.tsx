import { Text, View,Pressable} from 'react-native'
import {useState} from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { AuthStackList, RootStackParamList } from '../navigation/Navigation.interface'

import React from 'react'

type Props =
{
    setModalVisible:React.Dispatch<React.SetStateAction<boolean>>
    navigation: NativeStackNavigationProp<AuthStackList, "AddSocialMediaModal">
}

const AddSocialMediaModal = ({setModalVisible,navigation}:Props) => {
    const [press, setPress] = useState<string>('Log into existing account')
    const { push } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    //const navigation=useNavigation<RootStackProps<'Landing'>>()
  return (
    <View className='w-full bg-[#1C1C1E] px-[16px] pt-[8px] pb-[40px] flex justify-center items-center rounded-t-[30px]'>
        <View className='h-[3px] w-[48px] bg-[#ABABAB] rounded-[5px] mb-[21px]'></View>
        <Pressable onPress={()=>setModalVisible(false)} className='w-full'>
            <Text className='text-white text-center text-[16px] mb-[32px]' style={{fontFamily:'Lato-700'}}>
                Add Account
            </Text>
        </Pressable>

        <Pressable onPress={()=>setPress('Log into existing account')} 
        onLongPress={()=>{navigation.navigate('LoginWithPassword'), setModalVisible(false)}}
        className='h-[48px] w-full rounded-[5px] justify-center items-center' style={press==='Log into existing account' && {backgroundColor:'#0B52BC'}}
        >
            <Text className='text-center text-white text-[17px]'>
                Log Into Existing Account
            </Text>
        </Pressable>

        <Pressable onPress={() => setPress('Create new account')} 
        onLongPress={() =>{navigation.navigate('SignUpName') , setModalVisible(false)}}
        className='h-[48px] w-full rounded-[5px] justify-center items-center' 
        style={press==='Create new account'&& {backgroundColor:'#0B52BC'}}
        >
            <Text className='text-center text-white text-[17px]'>
                Create new account 
            </Text>
        </Pressable>
    </View>
  )
}

export default AddSocialMediaModal
