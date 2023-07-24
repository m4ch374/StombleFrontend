import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, TextInputComponent } from 'react-native'
import { AuthStackList } from '../../../navigation/Navigation.interface';
import BackgroundColor from '../../../style/BackgroundColor';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import FlatButton from '../../../style/FlatButton';
import ProfileButton from '../../../components/ProfileButton';

interface Props 
{
    navigation: NativeStackNavigationProp<AuthStackList, "EditName">;
}
const EditName = ({ navigation }: Props) => 
{
    const [disabled, setDisabled] = useState(true)
    return (
        <BackgroundColor>
            <View className='flex-1 p-[16px]' style={{ flexDirection: 'column', height: '100%' }}>
                <View className='flex-1'>
                    <View className='mb-2'>
                        <Text
                            className='text-white text-sm'
                            style={{ fontFamily: 'Lato-400' }}>
                            Full Name
                        </Text>
                    </View>
                    <View className='h-12 bg-transparent rounded-md flex-row items-center justify-between px-3 border border-solid border-white mt-3'>
                        <TextInput
                            className='text-white py-auto text-base leading-[16px] w-[280px] h-5'
                            style={{ fontFamily: 'Lato-700' }}
                            placeholderTextColor='#ABABAB'
                        />
                        <ProfileButton height={24} width = {20}
                        text = {"Save"} ></ProfileButton>
                    </View>
                    <View className='mb-2'>
                        <Text
                            className='text-white text-sm mt-3'
                            style={{ fontFamily: 'Lato-400' }}>
                            {/* This name will be displayed as your profile name. */}
                        </Text>
                    </View>
                </View>
                {/* <View className='flex-2 justify-end mb-10'>
                    <FlatButton
                        text="SIGN UP"
                        disabled={disabled}
                        onPress={() => navigation.navigate('SaveLoginInfor')} />
                </View> */}
            </View>
        </BackgroundColor>
    );
}
export default EditName;