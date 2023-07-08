
import { View, Text,Keyboard,TouchableWithoutFeedback} from 'react-native'
import React,{useState} from 'react'
import LoginScreenLayout from '../../../style/LoginScreenLayout'
import FlatButton from '../../../style/FlatButton'
import { Link } from '@react-navigation/native'
import PhoneNumberInput from '../../../components/PhoneNumberInput'
import { EvilIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackList } from '../../../navigation/Navigation.interface'
interface Props {
  navigation: NativeStackNavigationProp<AuthStackList, 'ForgetPassword'>;
}

const ForgetPassword = ({navigation}: Props) => {
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState(false)
  const [phone, setPhone] = useState("")

  function checkPhoneValidation(){}

  //check phoneNumber validation
  const checkHandle=()=>{
    Keyboard.dismiss();
    checkPhoneValidation();
  }

  const handleSubmit=()=>{
    //provide phone number value here
    !disabled && navigation.navigate('SetUpPassword')
    setError(false)
    setDisabled(true)
  }
  return (
    <LoginScreenLayout>
      <TouchableWithoutFeedback onPress={checkHandle}>
      <View className='p-[16px]'>
        <View className='mb-[8px] flex gap-[24px]'>
          <Text className='text-[14px] text-white' style={{fontFamily:'Lato-700'}}>
            Please reset your password for restoring the security of the account.
          </Text>

          <Text className='text-[12px] text-[#FFFFFF60]'>
            Mobile Number
          </Text>
        </View>

        <View className='mt-[8px]'>
          <PhoneNumberInput 
          setDisabled={setDisabled} 
          setError={setError}
          setPhone={setPhone}
          checkValid={checkPhoneValidation}
          />
        </View>

        {error && 
        <View className='flex-row mt-[18px] mb-[17px]'>
            <View>
            <EvilIcons name="exclamation" size={20} color="#F4222F" />
            </View>
            <Text className='text-[14px] text-[#F4222F]'>
              The phone number you entered is not valid.
            </Text>
        </View>}

        <View className='flex-row justify-center items-center mb-4 mt-[378px]'>
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

        <View className=" mb-[16px] ">
            <FlatButton
              text="CONTINUE"
              disabled={disabled}
              
              onPress={handleSubmit}
            />
        </View>
        <View className='flex-row justify-center items-center align-middle mb-5'>
          <Text className='text-sm text-white'>
              Don't have an account? 
          </Text>
        <View className='ml-[2px]'>
          <Link to={'SignUp'}>
            <Text className='text-[#326FCB] font-semibold'>Register</Text>
          </Link>
        </View>
        </View>
        </View>
      </TouchableWithoutFeedback>
    </LoginScreenLayout>
  )
}

export default ForgetPassword