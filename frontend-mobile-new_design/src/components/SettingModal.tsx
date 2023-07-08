import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackList } from '../navigation/Navigation.interface';
import { useState } from 'react';
import QRModal from './QRModal';
import React from 'react';

type Props = {
    setModalVisible:React.Dispatch<React.SetStateAction<boolean>>
    navigation?:NativeStackNavigationProp<ProfileStackList,'Profile'>
}

const settingData=['Settings','QR code','Copy profile link']

const SettingModal = ({setModalVisible,navigation}: Props) => {
    const [QRmodalVisable, setQRmodalVisable] = useState(false)
    const handleArrow=(item:string)=>{
        if(item==='Settings'){
            navigation?.navigate('Settings')
        }else if(item==='QR code'){
            setQRmodalVisable(true)
        }else{
            console.log('Profile link')
        }
    }
  return (
    <View className='h-[256px] w-full bg-[#252525] rounded-[10px]'>
        <View className='h-[3px] w-[48px] bg-[#ABABAB] self-center mt-[8px] mb-[30px]'></View>
        {settingData.map(item=>(
            <View className='flex-row pb-[37px] px-[28px] justify-between' key={item}>
                <Text className='text-[18px] text-white' style={{fontFamily:'Lato-400'}}>
                    {item}
                </Text>
                <Pressable onPress={()=>handleArrow(item)}>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
                </Pressable>
            </View>
        ))}

        <Modal animationType='slide' transparent={true} visible={QRmodalVisable}>
            <QRModal setModalVisible={setQRmodalVisable}/>
        </Modal>
    </View>
  )
}

export default SettingModal

const styles = StyleSheet.create({})