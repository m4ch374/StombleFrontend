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
  navigation: NativeStackNavigationProp<AuthStackList, 'SignUp'>;
}
type items={
  name:string,
  DOB:string,
  phone:string
}
console.log("123456")
const SignUp = ({navigation}:Props) => {
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState(false)
  const [phone, setPhone] = useState('')

  const sendValues=(items:items)=>{
    //send items to backedn
  }

  const convertDate=(date:Date)=>{
    const year=date.getFullYear()
    const month=date.getMonth()+1
    const day=date.getDay()
    return `${day.toString().padStart(2,'0')}/${month.toString().padStart(2,'0')}/${year}`
  }
  function checkPhoneValidation(){}
  return (
    <LoginScreenLayout>
      <ScrollView className='p-[16px]'>
        <View className='mb-[16px]'>
          <Text
            className='text-[18px] text-[#FFFFFF] tracking-wide leading-[21.6px]'
            style={{fontFamily: 'Lato-700'}}>
            Create Stomble Personal account
          </Text>
        </View>

        <View className='flex-row'>
          <Formik
            initialValues={{
              name: '',
              DOB: convertDate(new Date()),
              phone: phone,
            }}
            onSubmit={(values, action) => 
            {
              navigation.navigate('VerifyCode');
              sendValues(values);
              action.resetForm();
            }}>
            {(props) => (
              <View className='flex-1'>
                <View className='mb-[8px]'>
                  <Text className='text-[12px] text-white'>Full Name</Text>
                </View>

                <TextInput
                  className='h-42 rounded-[5px] text-[16px] mb-[24px] p-[12px] text-white bg-[#4F4F4F]'
                  style={{fontFamily: 'Lato-400'}}
                  placeholder='Johan Doe'
                  placeholderTextColor='white'
                  onChangeText={props.handleChange('name')}
                  value={props.values.name}
                />

                <View className='mb-[8px]'>
                  <Text className='text-[12px] text-white'>
                    When is your Birthday?
                  </Text>
                </View>

                <View className=''>
                  <TextInput
                    className='h-42 rounded-[5px] text-[16px] text-white p-[12px] bg-[#4F4F4F]'
                    style={{fontFamily: 'Lato-400'}}
                    placeholder='Day/Month/Year'
                    placeholderTextColor='white'
                    value={props.values.DOB}
                    onChangeText={props.handleChange('DOB')}
                  />
                </View>

                <View className='mt-[24px] mb-[150px]'>
                  <Text className='text-[12px] text-white mb-[8px]'>
                    Mobile Number
                  </Text>
                  <PhoneNumberInput
                    setDisabled={setDisabled}
                    setError={setError}
                    setPhone={setPhone}
                    checkValid={checkPhoneValidation}
                  />
                </View>

                <View className='flex-row justify-center items-center mb-[16px]'>
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

                <View className=' mb-[16px] '>
                  <FlatButton
                    text='SEND CODE'
                    disabled={disabled}
                    onPress={props.handleSubmit}
                  />
                </View>

                <View className='flex-row justify-center items-center align-middle'>
                  <Text
                    className='text-[16px] text-white'
                    style={{fontFamily: 'Lato-700'}}>
                    Already have an account?
                  </Text>
                  <View className='ml-[4px]'>
                    <Link to={'/LandingWithAccount'}>
                      <Text className='text-[#326FCB] font-semibold'>
                        Log In
                      </Text>
                    </Link>
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </LoginScreenLayout>
  );
}

export default SignUp

