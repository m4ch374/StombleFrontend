import { Text, View,TouchableWithoutFeedback, Keyboard,Alert } from 'react-native'
import {useState} from 'react'
import { Link } from '@react-navigation/native'
import LoginScreenLayout from '../../../style/LoginScreenLayout'
import { TextInput } from 'react-native'
import FlatButton from '../../../style/FlatButton'
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackList } from '../../../navigation/Navigation.interface'
import React from 'react'

interface Props {
  navigation: NativeStackNavigationProp<AuthStackList, 'VerifyPassword'>;
}

const VerifyPassword = ({navigation}: Props) => {
  const correctPassword='abc123'

  const [disabled, setDisabled] = useState(true)
  const [password, setPassword] = useState("")
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  
  const handleSubmit=()=>{

    //check password validation
    if(password===correctPassword){
    navigation.navigate('HomeScreen')
    setDisabled(true)
    }else{
      Alert.alert('OPPS!','Your password is not right, you have 2 more times to try.',[
        {text:'OK',onPress:()=>console.log('alert closed!')}
      ])
    }
  }
  return (
    <LoginScreenLayout>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='p-[16px]'>
      <View className='mb-[16px]'>
        <Text className='text-white text-[16px]'>Please enter your password  to verify</Text>
      </View>
      
      <View className='h-[48px] w-full bg-[#4F4F4F] rounded-[5px] flex-row items-center justify-between px-[12px]'>
      <TextInput className='text-white text-[16px] flex-2'
      placeholder='Enter Password'
      onChangeText={(text)=>setPassword(text)}
      placeholderTextColor='#C1C1C1'
      style={{fontFamily:'Lato-700'}}
      secureTextEntry={secureTextEntry}/>
          <TouchableWithoutFeedback className='flex-1'
          onPress={()=>setSecureTextEntry(!secureTextEntry)}>
            <Ionicons 
              name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
              size={20} 
              color="#C1C1C1" />   
          </TouchableWithoutFeedback>
      </View>
      <Text className='text-[16px] text-[#FFFFFF] mt-[16px]' 
          style={{fontFamily:'Lato-700'}}>
          <Link to={'/ForgetPassword'}>
           Forgot Your Password?
          </Link>
      </Text>

      <View className='flex-row justify-center items-center mb-[16px] mt-[260px]'>
          <Text className='text-[#C1C1C1] text-[10px]'>
            By continuing you agree to the
          </Text>    

          <View className='px-[4px]'>
          <Text className='text-[#326FCB] text-[10px]'>
            <Link to={'TermsAndPrivacy'} >
              Terms of Service 
            </Link>
          </Text>
          </View>

           <Text className='text-[#C1C1C1] text-[10px]'>
            and 
            </Text>

          <View className='pl-[4px]'>
          <Text className='text-[#326FCB] text-[10px]'>
          <Link to={'TermsAndPrivacy'}>
            Privacy Policies
          </Link>
          </Text>
          </View>
        </View>

        <View className="mb-[16px] ">
            <FlatButton
              text="LOG IN"
              disabled={disabled}
              //onPress={handleSubmit}
              onPress={() => navigation.navigate('HomeScreen')}
              
              
            />
        </View>
        <View className='flex-row justify-center items-center align-middle mb-[94px]'>
          <Text className='text-[14px] text-white'>
              Don't have an account? 
          </Text>
        <View className='ml-[2px]'>
          <Link to={ 'SignUp'}>
            <Text className='text-[#326FCB] font-semibold'>Register</Text>
          </Link>
        </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
    </LoginScreenLayout>
  )
}

export default VerifyPassword
