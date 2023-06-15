import { Text, View } from 'react-native'
import {useState} from 'react'
import BackgroundColor from '../../../style/BackgroundColor'
import PhoneNumberInput from '../../../components/PhoneNumberInput'
import FlatButton from '../../../style/FlatButton'
import { Link } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackList } from '../../../navigation/Navigation.interface'

type Props = {
    navigation:NativeStackNavigationProp<AuthStackList,'VerifyPhone'>
}

const VerifyPhone = ({navigation}: Props) => {
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState(null as unknown as boolean)
    const [phone, setPhone] = useState("")
  
    function checkPhoneValidation(){}
  return (
    <BackgroundColor>
    <View className='flex-1 px-[16px] pt-[28px] gap-[24px]'>
      <Text className='text-white text-[16px]' style={{fontFamily:'Lato-700'}}>
        Verify your mobile number to get started
      </Text>

      <View className='flex-1'>
        <Text className='text-[#ffffff80] text-[14px] leading-[22px] text-start mb-[8px]'>
         Mobile Number
        </Text>
        <PhoneNumberInput  
          setError={setError}
          setDisabled={setDisabled}
          setPhone={setPhone}
          checkValid={checkPhoneValidation}
          />
      </View>

      <View className='flex-2 justify-end'>
        <View className='flex-row justify-center items-center mb-[16px]'>
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
              text="SEND CODE"
              disabled={disabled}
              onPress={()=>navigation.navigate('VerifyCode')}
            />
        </View>

        <View className='flex-row justify-center items-center align-middle'>
          <Text className='text-[16px] text-white' style={{fontFamily:'Lato-700'}}> 
            Already have an account? 
          </Text>
        <View className='ml-[2px]'>
          <Link to={'/ChooseAccountType'}>
            <Text className='text-[#326FCB] font-semibold'> Log In</Text>
          </Link>
        </View>
        </View>
      </View>
    </View>
    </BackgroundColor>
  )
}

export default VerifyPhone
