
import { View, Text, TextInput,TouchableWithoutFeedback, Keyboard } from 'react-native'
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
  navigation: NativeStackNavigationProp<AuthStackList, 'SetUpPassword'>;
}
// const passwordReg=Yup.object({
//   newPassword:Yup.string()
//   .required()
//   .matches(
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
//     'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
//   )
  
//   ,
//   confirmPW:Yup.string()
//   .required('Confirm password is required')
//   .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
// })

const SetUpPassword = ({navigation}:Props ) => {
  const [secureTextEntry, setSecureTextEntry] = useState(false)
  //const password = "MyPassword123!"; // Replace this with the actual password value
  //const isValidPassword = password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/);
  return (
    <LoginScreenLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='p-[16px]'>
        <View className='mb-[24px]'>
          <Text className='text-white text-[16px]' style={{fontFamily:'Lato-400'}}>
            Set up a password for extra security.
          </Text>
        </View>

        <View>
          <Formik 
              initialValues={{newPassword:'',confirmPW:''}}
              //validationSchema={passwordReg}
              onSubmit={value=>console.log(value)}>

              {(props)=>(
                <>
                <View className='mb-[8px]'>
                  <Text className='text-[12px] text-[#FFFFFF60]' 
                  style={{fontFamily:'Lato-400'}}>
                    New Password
                  </Text>
                </View>     
            
                <View className='flex-row h-[42px] bg-[#4F4F4F] mb-[24px] rounded-[5px] items-center justify-between px-[12px]'>
                <TextInput className='text-white text-[16px] h-full'
                  style={{fontFamily:'Lato-700'}}
                  placeholder ='Add New Password'
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
                  <View className=''
                  style={{marginBottom:props.errors.newPassword? 15:0}}>
                    <Text className='text-[#ABABAB] text-[14px] pr-[20px]' style={{ marginBottom:7 }}>
                       Password must contain:
                    </Text>
                    {props.errors.newPassword && 
                      <View className='flex-row gap-[6px]'>
                      <EvilIcons name="exclamation" size={24} color="#F4222F" />
                      
                      <Text className='text-[#F4222F] text-[14px] pr-[22px]' style={{ marginBottom:10 }} >
                        {props.errors.newPassword}
                      </Text>
                    </View>}
                      <Text
                        className={`text-[#ABABAB] text-[14px] pr-[20px]`}
                        style={{ marginBottom: 5}}
                      >
                        At least 8 characters
                      </Text>
                      <Text
                        className={`text-[#ABABAB] text-[14px] pr-[20px]`}
                        style={{ marginBottom: 5}}
                      >
                        An uppercase character
                      </Text>
                      <Text
                        className={`text-[#ABABAB] text-[14px] pr-[20px]`}
                        style={{ marginBottom: 5}}
                      >
                        A lowercase character
                      </Text>
                      <Text
                        className={`text-[#ABABAB] text-[14px] pr-[20px]`}
                        style={{ marginBottom: 5}}
                      >
                        A number
                      </Text>
                      <Text
                        className={`text-[#ABABAB] text-[14px] pr-[20px]`}
                        style={{ marginBottom: 5}}
                      >
                        A special character
                      </Text>
                    </View>
                }
                
                <View className='mb-[8px]'>
                      <Text className='text-[12px] text-[#FFFFFF60]' style={{fontFamily:'Lato-400'}}>
                        Confirm New Password
                      </Text>
                </View>
                
                <View className='h-[42px] bg-[#4F4F4F] mb-[24px] rounded-[5px] flex-row items-center justify-between px-[12px]'>
                      <TextInput className='text-white text-[16px] h-full'
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
                      <Text
                        className={`text-[#ABABAB] text-[14px] pr-[20px]`}
                        style={{ marginBottom: 5}}
                      >
                       Password match
                      </Text>

                {props.initialTouched.confirmPW ? null
                  // <View className='flex-row gap-[5px]'
                  // style={{marginBottom:props.errors.confirmPW? 15:0}}>
                  //   <Text className='text-[#F4222F] text-[14px] '>
                  //     <EvilIcons name="exclamation" size={24} color="#F4222F" />
                  //     {props.touched.confirmPW && props.errors.confirmPW}
                  //   </Text>
                  // </View>
                  :
                  <View style={{marginBottom:props.errors.confirmPW? 15:0}}>
                      {props.errors.confirmPW && 
                    <View className='flex-row gap-[5px]'>
                      <EvilIcons name="exclamation" size={24} color="#F4222F" />
                      <Text className='text-[#F4222F] text-[14px]'>
                        { props.errors.confirmPW}
                      </Text>
                    </View>}
                  </View>
                }

                <View className='flex-row justify-center items-center mb-[16px] mt-[180px]'>
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
                    text='SEND CODE'
                      disabled={Object.keys(props.errors).length!==0 }
                      onPress={() => navigation.navigate('VerifyCode')}
                    
                />
                </>
                    )}
          </Formik>               
        </View>
        </View>
      </TouchableWithoutFeedback>
    </LoginScreenLayout>
  )
}

export default SetUpPassword