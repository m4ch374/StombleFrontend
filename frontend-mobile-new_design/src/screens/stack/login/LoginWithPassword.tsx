import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import { Link } from '@react-navigation/native'
import { EvilIcons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import LoginScreenLayout from '../../../style/LoginScreenLayout'
import FlatButton from '../../../style/FlatButton'

import PhoneNumberInput from '../../../components/PhoneNumberInput'
import { AuthStackList } from '../../../navigation/Navigation.interface'

interface Props 
{
  navigation: NativeStackNavigationProp<AuthStackList, 'LoginWithPassword'>
}
const LoginWithPassword = ({ navigation }: Props) => {
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState(false)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  console.log(password)
  //fetch the correct password from the backend
  const correctPassword = 'aaaaaaaa'

  function checkPhoneValidation() {}

  //check phoneNumber validation
  const checkHandle = () => {
    Keyboard.dismiss()
    password !== '' && checkPhoneValidation()
  }

  const handleSubmit = () => {
    //check password validation
    if (password === correctPassword) {
      Alert.alert('Login Successful!', '.', [
        { text: 'OK', onPress: () => console.log('alert closed!') },
      ])
      navigation.navigate('SaveLoginInfor')
      setError(false)
      setDisabled(true)
    } else {
      Alert.alert(
        'OPPS!',
        'Your password is not right, you have 2 more times to try. You can log in with your phone by code before your account locked.',
        [{ text: 'OK', onPress: () => console.log('alert closed!') }]
      )
    }
  }
  return (
    <LoginScreenLayout>
      <TouchableWithoutFeedback onPress={checkHandle}>
        <View className='p-4 justify-between h-full'>
          <View>
            <View className='mb-2'>
              <Text
                className='text-white text-sm'
                style={{ fontFamily: 'Lato-400' }}
              >
                Mobile Number
              </Text>
            </View>
            <View className='mb-8'>
              <PhoneNumberInput
                setError={setError}
                setDisabled={setDisabled}
                setPhone={setPhone}
                checkValid={checkPhoneValidation}
              />
            </View>

            <View className='mb-2'>
              <Text
                className='text-white text-sm'
                style={{ fontFamily: 'Lato-400' }}
              >
                Password
              </Text>
            </View>
            <View className='h-12 bg-transparent rounded-md flex-row items-center justify-between px-3 border border-solid border-white'>
              <TextInput
                className='text-white py-auto text-base leading-[16px] w-[280px] h-5'
                style={{ fontFamily: 'Lato-700' }}
                placeholder='Enter Password'
                placeholderTextColor='#ABABAB'
                secureTextEntry={secureTextEntry}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />

              <TouchableWithoutFeedback
                className='flex-1'
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              >
                <Ionicons
                  name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color='#C1C1C1'
                />
              </TouchableWithoutFeedback>
            </View>

            <View className='flex-row justify-between mt-[17px] '>
              <Text
                className='text-4 text-[#FFFFFF]'
                style={{ fontFamily: 'Lato-700' }}
              >
                <Link to={'/ForgetPassword'}>Forgot Your Password?</Link>
              </Text>
            </View>

            {error && (
              <View className='flex-row mt-7'>
                <View>
                  <EvilIcons name='exclamation' size={24} color='#F4222F' />
                </View>
                <Text className='text-sm text-[#F4222F]'>
                  The mobile number you entered is invalid.
                </Text>
              </View>
            )}
          </View>

          <View>
            <View className='flex-row justify-center items-center mb-4 mt-[260px]'>
              <Text className='text-[#C1C1C1] text-[10px]'>
                By continuing you agree to the
              </Text>

              <View className='px-[4px]'>
                <Text className='text-[#326FCB] text-[10px]'>
                  <Link to={'/TermsAndPrivacy'}>Terms of Service</Link>
                </Text>
              </View>

              <Text className='text-[#C1C1C1] text-[10px]'>and</Text>

              <View className='pl-[4px]'>
                <Text className='text-[#326FCB] text-[10px]'>
                  <Link to={'/TermsAndPrivacy'}>Privacy Policies</Link>
                </Text>
              </View>
            </View>

            <View className='mb-[16px]'>
              <FlatButton
                text='LOG IN'
                disabled={disabled}
                onPress={handleSubmit}
              />
            </View>
            <View className='flex-row justify-center items-center align-middle mb-5'>
              <Text className='text-sm text-white'>Don't have an account?</Text>
              <View className='ml-[2px]'>
                <Link to={'/SignUp'}>
                  <Text className='text-[#326FCB] font-semibold'>Register</Text>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </LoginScreenLayout>
  )
}
export default LoginWithPassword
