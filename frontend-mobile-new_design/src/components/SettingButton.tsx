import { Pressable, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackList } from '../navigation/Navigation.interface';

type Props = {
    text:string
    onPress?: () => void; // Optional onPress function
};

const SettingButton = ({text, onPress }: Props) => 
{
  const handleKeyboardIconPress = () => {
    if (onPress) {
      onPress();
    }
  };
  
  return (
    <Pressable className='pl-[12px] pr-[18px] py-[18.5px] border-b-[1px] border-b-[#ffffff10]' onPress={handleKeyboardIconPress}>
        <View className='flex-row justify-between items-center '>
            <Text className='text-white text-[14px]'>{text}</Text>
            
            <MaterialIcons name="keyboard-arrow-right" size={24} color="white" 
            
            />
        </View>
    </Pressable>
  ) 
}

export default SettingButton

