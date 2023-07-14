import { View, Text , Alert,TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native'
import React,{useEffect, useState, useRef} from 'react'
import LoginScreenLayout from '../../../style/LoginScreenLayout'
import { Link } from '@react-navigation/native'
import FlatButton from '../../../style/FlatButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackList } from '../../../navigation/Navigation.interface'

interface Props {
  navigation: NativeStackNavigationProp<AuthStackList, 'VerifyCode'>;
}

const VerifyCode = ({navigation}: Props) => {
  const [codeValid,setCodeValid]=useState(true)
  const [timer, setTimer] = useState(60)
  const [sendCode, setSendCode] = useState(false)
  const [codeArray, setCodeArray] = useState<string[]>([])
  const codeRef1=useRef<TextInput>(null)
  const codeRef2=useRef<TextInput>(null)
  const codeRef3=useRef<TextInput>(null)
  const codeRef4=useRef<TextInput>(null)
  const codeRef5=useRef<TextInput>(null)
  const codeRef6=useRef<TextInput>(null)

  type code = {
    code1: string;
    code2: string;
    code3: string;
    code4: string;
    code5: string;
    code6: string;
  };
  const initialValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  };
  const codeReview=Yup.object().shape({
    code1:Yup.string().required().max(1),
    code2:Yup.string().required().max(1),
    code3:Yup.string().required().max(1),
    code4:Yup.string().required().max(1),
    code5:Yup.string().required().max(1),
    code6:Yup.string().required().max(1),
  })

  useEffect(()=>{
    //fetch the code here 

  },[])

  useEffect(()=>{
    let interval:NodeJS.Timer
    if(timer>0 && !sendCode){
      interval=setInterval(
        () =>{
           setTimer(timer-1)         
        }, 1000)
    }else{
      setSendCode(true)
    }
      return ()=>clearInterval(interval)
  },[timer])

  const handleSubmit=(values:code)=>{
    //pass the values to codeArray
    //if the fetch data is object, can use setSubmitting to submit the values as obj
    const valuesString=Object.values(values)
    setCodeArray(valuesString)
    //check the code validation here:
    //compare the codeArray with the fetched data

    if(codeValid){
      // Alert.alert('Login Successuf!', '', [
      //   {text: 'OK', onPress: () => console.log('alert closed')},
      // ]);
      navigation.navigate('SignUpName')
    }else{
      Alert.alert('OOPS!','code is not right. Please resend the code again',[
        {text:'OK',onPress:()=>console.log('alert closed')}
      ])
    }
  }
  return (
    <LoginScreenLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='p-[16px]'>
        <Formik initialValues={initialValues} 
          validationSchema={codeReview}
          onSubmit={handleSubmit}>

          {(props)=>(
            <>
              <View className='mb-[16px] mt-[27px] flex-row gap-[12px] mx-auto'>        
                <TextInput 
                className='h-[42px] w-[40px] border-[0.6px] border-white rounded-[5px] text-white text-center' 
                keyboardType='numeric'
                ref={codeRef1}
                value={props.values.code1}
                onChangeText={(value)=>{ 
                  props.setFieldValue('code1', value)
                  props.isValid && codeRef2.current?.focus()
                }}
                // onSubmitEditing={()=>{
                //   props.setErrors({})
                //   codeRef2.current?.focus()}
                // }
                onBlur={()=>codeRef2.current?.focus()}
                />     
                
                <TextInput 
                className='h-[42px] w-[40px] border-[0.6px] border-white rounded-[5px] text-white text-center' 
                keyboardType='numeric'
                ref={codeRef2}
                value={props.values.code2}
                onChangeText={(value)=>{ 
                  props.setFieldValue('code2', value)
                  codeRef3.current?.focus()
                }}
                // onSubmitEditing={()=>{
                //   props.setErrors({})
                //   codeRef3.current?.focus()}}
                onBlur={()=>codeRef3.current?.focus()}
                />   

                <TextInput 
                className='h-[42px] w-[40px] border-[0.6px] border-white rounded-[5px] text-white text-center' 
                keyboardType='numeric'
                ref={codeRef3}
                value={props.values.code3}
                onChangeText={(value)=>{ 
                  props.setFieldValue('code3', value)
                  codeRef4.current?.focus()
                  }}
                onBlur={()=> codeRef4.current?.focus()}
                />    

                <TextInput 
                className='h-[42px] w-[40px] border-[0.6px] border-white rounded-[5px] text-white text-center' 
                keyboardType='numeric'
                ref={codeRef4}
                value={props.values.code4}
                onChangeText={(value)=>{ 
                  props.setFieldValue('code4', value)
                  codeRef5.current?.focus()
                  }}
                onBlur={()=>codeRef5.current?.focus()}
                />

                <TextInput 
                className='h-[42px] w-[40px] border-[0.6px] border-white rounded-[5px] text-white text-center' 
                keyboardType='numeric'
                ref={codeRef5}
                value={props.values.code5}
                onChangeText={(value)=>{ 
                  props.setFieldValue('code5', value)
                  codeRef6.current?.focus()
                  }}
                onBlur={()=>codeRef6.current?.focus()}
                />  

                <TextInput 
                className='h-[42px] w-[40px] border-[0.6px] border-white rounded-[5px] text-white text-center' 
                keyboardType='numeric'
                ref={codeRef6}
                value={props.values.code6}
                onChangeText={props.handleChange('code6')}
                onBlur={props.handleBlur('code6')}
                // onSubmitEditing={()=> {
                //   props.setErrors({})
                //   codeRef6.current?.focus()}}
                />    
              </View>

              <View className='px-[50px] mb-[24px]'>
                <Text className='text-[15px] text-center text-white' style={{fontFamily:'Lato-400'}}>
                Enter the 6 digit code we send to +61*****23
                </Text>
              </View>

              <View className='mb-[174px]'>
                {!sendCode ?
                <Text className='text-[16px] text-white text-center' 
                style={{fontFamily:'Lato-400'}}>
                Resend code in {timer} seconds
                </Text>         
                : <Text className='text-[16px] text-white text-center' 
                style={{fontFamily:'Lato-700'}}>
                  <Link to={'/VerifyCode'}>Resend code</Link> 
                </Text>}
              </View>

              <View className='flex-row justify-center items-center mb-[16px]  mt-[180px]'>
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
                    text="VERIFY CODE"
                    disabled={Object.keys(props.errors).length!==0 || initialValues.code1===''}
                    onPress={() => navigation.navigate('SaveLoginInfor')}
                    //onPress={() => navigation.navigate('ChooseAccountType')}
                  />
              </View>
              </> 
           )}
        </Formik>
      </View>
      </TouchableWithoutFeedback>
    </LoginScreenLayout>
  )
}

export default VerifyCode