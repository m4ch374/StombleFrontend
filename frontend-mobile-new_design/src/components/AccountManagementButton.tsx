import { Pressable, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackList } from '../navigation/Navigation.interface';
import ProfileButton from './ProfileButton';

type Props = {
    text:string
    onPress?: () => void; // Optional onPress function
    text1:string
};

const AccountManagementButton = ({text, onPress, text1 }: Props) => 
{
  const handleKeyboardIconPress = () => 
  {
    if (onPress) {
      onPress();
    }
  };
  
  return (
    <Pressable className='pl-[12px] pr-[18px] py-[18.5px] border-b-[1px] border-b-[#ffffff10]' >
        <View className='flex-row justify-between items-center '>
            <Text className='text-white text-[14px]'  >{text}</Text>
                <ProfileButton text = {text1} onPress={handleKeyboardIconPress} ></ProfileButton>
        </View>
    </Pressable>
  ) 
}

export default AccountManagementButton

