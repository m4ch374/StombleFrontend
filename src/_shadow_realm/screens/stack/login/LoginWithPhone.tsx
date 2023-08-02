import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import { Link } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { EvilIcons } from '@expo/vector-icons'

import LoginScreenLayout from '../../../style/LoginScreenLayout'
import FlatButton from '../../../style/FlatButton'

import { AuthStackList } from '../../../navigation/Navigation.interface'
import PhoneNumberInput from '../../../components/PhoneNumberInput'
import UseEffectSkipInitial from '../../../hooks/UseEffectSkipInitial'

interface Props {
  navigation: NativeStackNavigationProp<AuthStackList, 'LoginWithPhone'>
}

const LoginWithPhone = ({ navigation }: Props) => {
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState(null as unknown as boolean)
  const [phone, setPhone] = useState('')

  function checkPhoneValidation() {}

  //check phoneNumber validation

  const checkHandle = () => {
    Keyboard.dismiss()
    checkPhoneValidation()
  }

  const handleSubmit = () => {
    //provide phone number value here
    !disabled && navigation.navigate('VerifyCode')
    setError(false)
    setDisabled(true)
  }
  return (
    <LoginScreenLayout>
      <ScrollView className='flex-1 p-4'>
        <View className='mb-2'>
          <Text
            className='text-white text-sm'
            style={{ fontFamily: 'Lato-400' }}
          >
            Mobile Number
          </Text>
        </View>
        <View className='mb-4'>
          <PhoneNumberInput
            setError={setError}
            setDisabled={setDisabled}
            setPhone={setPhone}
            checkValid={checkPhoneValidation}
          />
        </View>

        {error && (
          <View className='flex-row mt-[18px] mb-[17px]'>
            <View>
              <EvilIcons name='exclamation' size={20} color='#F4222F' />
            </View>
            <Text className='text-[14px] text-[#F4222F]'>
              The phone number you entered is not valid.
            </Text>
          </View>
        )}

        <Text
          className='text-4 mb-[300px] text-[#FFFFFF]'
          style={{ fontFamily: 'Lato-700' }}
        >
          <Link to={'/LoginWithPassword'}>or Login With Password</Link>
        </Text>

        <View className='flex-row justify-center items-center mb-4'>
          <Text className='text-[#C1C1C1] text-[10px]'>
            By continuing you agree to the
          </Text>

          <View className='px-[4px]'>
            <Text className='text-[#326FCB] text-[10px]'>
              <Link to={'TermsAndPrivacy'}>Terms of Service</Link>
            </Text>
          </View>

          <Text className='text-[#C1C1C1] text-[10px]'>and</Text>

          <View className='pl-[4px]'>
            <Text className='text-[#326FCB] text-[10px]'>
              <Link to={'TermsAndPrivacy'}>Privacy Policies</Link>
            </Text>
          </View>
        </View>

        <View className=' mb-4 '>
          <FlatButton
            text='SEND CODE'
            disabled={disabled}
            onPress={handleSubmit}
          />
        </View>
        <View className='flex-row justify-center items-center align-middle mb-[94px]'>
          <Text className='text-[14px] text-white'>Don't have an account?</Text>
          <View className='ml-[2px]'>
            <Link to={'/ChooseAccountType'}>
              <Text className='text-[#326FCB] font-semibold'>Register</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </LoginScreenLayout>
  )
}

export default LoginWithPhone
