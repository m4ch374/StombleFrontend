import { View, Text, TextInput,TouchableWithoutFeedback, Keyboard,ScrollView } from 'react-native'
import React, {useState} from 'react'
import LoginScreenLayout from '../../../style/LoginScreenLayout'
import {Formik} from 'formik'
import { Ionicons } from '@expo/vector-icons';
import FlatButton from '../../../style/FlatButton';
import * as Yup from 'yup'
import { EvilIcons } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackList } from '../../../navigation/Navigation.interface';


interface Props {
  navigation: NativeStackNavigationProp<AuthStackList, 'ResetPassword'>;
}
const passwordReg=Yup.object({
  newPassword:Yup.string()
  .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\d/, 'Password must have a number')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'Password must have a special character'
      )
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .matches(/^\S*$/, 'Whitespace is not allowed')
      .required('Password is required'),
  confirmPW:Yup.string()
  .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\d/, 'Password must have a number')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'Password must have a special character'
      )
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .matches(/^\S*$/, 'Whitespace is not allowed')
      .required('Password is required')
  .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
})

const ResetPassword = ({navigation}:Props ) => {
  const [secureTextEntry, setSecureTextEntry] = useState(false)

  return (
    <LoginScreenLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='p-[16px]'>
        <View className='mb-[24px]'>
          <Text className='text-white text-[16px]' style={{fontFamily:'Lato-400'}}>
          Please reset your password for restoring the security of the account.
          </Text>
        </View>

        <ScrollView>
          <Formik 
              initialValues={{newPassword:'',confirmPW:''}}
              validationSchema={passwordReg}
              onSubmit={value=>{
                //save to backend

                //login to the welcome page
                navigation.navigate('HomeScreen')
                console.log(value)
              }
              }>

              {(props)=>(
                <>
                <View className='mb-[8px]'>
                  <Text className='text-[12px] text-[#ffffff60]' style={{fontFamily:'Lato-400'}}>
                    New Password
                  </Text>
                </View>     
            
                <View className='flex-row h-[48px] bg-[#4F4F4F] mb-[24px] rounded-[5px] items-center justify-between px-[12px]'>
                <TextInput className='text-white text-[16px] h-full w-full'
                  style={{fontFamily:'Lato-700'}}
                  placeholder='Add New Password'
                  placeholderTextColor="#ABABAB"
                  onChangeText={props.handleChange('newPassword')}
                  value={props.values.newPassword}
                  onBlur={props.handleBlur('newPassword')}
                  autoFocus
                  secureTextEntry={secureTextEntry}
                />
                <TouchableWithoutFeedback onPress={()=>setSecureTextEntry(!secureTextEntry)}>
                  <Ionicons 
                      name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
                      size={20} 
                      color="#C1C1C1" 
                  />   
                </TouchableWithoutFeedback>
                </View>

                {props.initialTouched.newPassword ? null
                  // <View className='flex-row gap-[5px]'
                  // style={{marginBottom:props.errors.newPassword? 15:0}}>
                  //   <Text className='text-[#F4222F] text-[14px] pr-[16px]'>
                  //     <EvilIcons name="exclamation" size={24} color="#F4222F" />
                  //     {props.touched.newPassword && props.errors.newPassword}
                  //   </Text>
                  // </View>
                  :
                  <View className='flex-row gap-[5px]'
                  style={{marginBottom:props.errors.newPassword? 15:0}}>
                    <Text className='text-[#F4222F] text-[14px] pr-[20px]'>
                      {props.errors.newPassword && 
                      <>
                      <EvilIcons name="exclamation" size={24} color="#F4222F" />
                      {props.errors.newPassword}
                      </>}
                    </Text>
                  </View>
                }
                

                <View className='mb-[8px]'>
                      <Text className='text-[12px] text-[#ffffff60]' style={{fontFamily:'Lato-400'}}>
                        Confirm Password
                      </Text>
                </View>
                
                <View className='h-[48px] bg-[#4F4F4F] mb-[24px] rounded-[5px] flex-row items-center justify-between px-[12px]'>
                      <TextInput className='text-white text-[16px] h-full w-full'
                       style={{fontFamily:'Lato-700'}}
                       placeholder='Confirm Password'
                       placeholderTextColor="#ABABAB"
                       onChangeText={props.handleChange('confirmPW')}
                       value={props.values.confirmPW}
                       onBlur={props.handleBlur('confirmPW')}
                       secureTextEntry={secureTextEntry}
                       />                      
                      <TouchableWithoutFeedback onPress={()=>setSecureTextEntry(!secureTextEntry)}>
                        <Ionicons 
                          name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
                          size={20} 
                          color="#C1C1C1" />   
                      </TouchableWithoutFeedback>
                </View>

                {props.initialTouched.confirmPW ? null
                  // <View className='flex-row gap-[5px]'
                  // style={{marginBottom:props.errors.confirmPW? 15:0}}>
                  //   <Text className='text-[#F4222F] text-[14px] '>
                  //     <EvilIcons name="exclamation" size={24} color="#F4222F" />
                  //     {props.touched.confirmPW && props.errors.confirmPW}
                  //   </Text>
                  // </View>
                  :
                  <View className='flex-row gap-[5px]'
                  style={{marginBottom:props.errors.confirmPW? 15:0}}>
                    <Text className='text-[#F4222F] text-[14px]'>
                      {props.errors.confirmPW && 
                        <>
                      <EvilIcons name="exclamation" size={24} color="#F4222F" />
                      { props.errors.confirmPW}
                       </>}
                    </Text>
                  </View>
                }

                <View className='flex-row justify-center items-center mb-[16px] mt-[200px]'>
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
                    
                <FlatButton 
                    text='CONFIRM'
                      disabled={Object.keys(props.errors).length!==0 }
                    onPress={props.handleSubmit}
                />
                </>
                    )}
          </Formik>               
        </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </LoginScreenLayout>
  )
}

export default ResetPassword