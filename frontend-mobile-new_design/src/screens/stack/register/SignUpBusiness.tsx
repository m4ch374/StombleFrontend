import { View, Text,ScrollView,TextInput } from 'react-native'
import React,{useState} from 'react'
import LoginScreenLayout from '../../../style/LoginScreenLayout'
import { Formik } from 'formik'
import PhoneNumberInput from '../../../components/PhoneNumberInput';
import {Link} from '@react-navigation/native'
import FlatButton from '../../../style/FlatButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackList } from '../../../navigation/Navigation.interface';


interface Props {
  navigation: NativeStackNavigationProp<AuthStackList, 'SignUpBusiness'>;
}
type items={
  name:string,
  businessName:string,
  phone:string,
  email:string
}

const SignUpBusiness = ({navigation}: Props) => {
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState(false)
  const [phone, setPhone] = useState('')

  const sendValues=(items:items)=>{
    //send items to backend
  }

  function checkPhoneValidation(){}
  return (
    <LoginScreenLayout>
      <ScrollView className='p-[16px]'>
        <View className='mb-[16px]'>
            <Text className='text-[18px] text-[#FFFFFF] tracking-wide leading-[21.6px]' 
            style={{fontFamily:'Lato-700'}}>
            Create your Business Account
            </Text>
        </View>

        <View className='flex-row'>
          <Formik initialValues={{name:'',businessName:'',phone:phone,email:''}}
          onSubmit={(values,action)=>{
            navigation.navigate('VerifyCode')
            sendValues(values)
            action.resetForm()
          }}>
            {(props)=>( 
              <View className='flex-1'>
              <View className='mb-[8px]'>
                <Text className='text-[12px] text-white'>
                Full Name
                </Text>
              </View>

              <TextInput className='h-42 rounded-[5px] text-[16px] mb-[24px] p-[12px] text-white bg-[#4F4F4F]'
              style={{fontFamily:'Lato-400'}}
              placeholder='Johan Doe'
              placeholderTextColor='white'
              onChangeText={props.handleChange('name')}
              value={props.values.name}
              />

              <View className='mb-[8px]'>
                <Text className='text-[12px] text-white'>
                What is your Business Name?
                </Text>
              </View>

              <TextInput className='h-42 rounded-[5px] text-[16px] mb-[24px] p-[12px] text-white bg-[#4F4F4F]'
              style={{fontFamily:'Lato-400'}}
              placeholder='Duck Duck Go'
              placeholderTextColor='white'
              onChangeText={props.handleChange('businessName')}
              value={props.values.name}
              />                           

              <Text className='text-[12px] text-white mb-[8px]'>
                Mobile Number
              </Text>
              <View className='mb-[24px]'>
              <PhoneNumberInput 
              setDisabled={setDisabled} 
              setError={setError} 
              setPhone={setPhone}
              checkValid={checkPhoneValidation}/>
             </View>

              <View className='mb-[8px]'>
                <Text className='text-[12px] text-white'>
                What is your Email Address?
                </Text>
              </View>

              <TextInput className='h-42 rounded-[5px] text-[16px] mb-[41.5px] p-[12px] text-white bg-[#4F4F4F]'
              style={{fontFamily:'Lato-400'}}
              placeholder='ahastomble@gmail.com'
              placeholderTextColor='white'
              onChangeText={props.handleChange('email')}
              value={props.values.name}
              />

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
                    onPress={props.handleSubmit}
                  />
              </View>

              <View className='flex-row justify-center items-center align-middle'>
                <Text className='text-[16px] text-white'
                style={{fontFamily:'Lato-700'}}>
                    Already have an account? 
                </Text>
                <View className='ml-[4px]'>
                <Link to={'/LoginWithPhone'}>
                    <Text className='text-[#326FCB] font-semibold'>Log In</Text>
                </Link>
                </View>
                </View>
            </View>
            )}
          </Formik>
        </View>
        </ScrollView>
    </LoginScreenLayout>
  )
}

export default SignUpBusiness

