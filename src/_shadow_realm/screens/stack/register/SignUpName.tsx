import { TextInput, Text, View } from 'react-native'
import React from 'react'
import BackgroundColor from '../../../style/BackgroundColor'
import { Formik } from 'formik'
import FlatButton from '../../../style/FlatButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackList } from '../../../navigation/Navigation.interface'


type Props = {
  navigation: NativeStackNavigationProp<AuthStackList, 'SignUpName'>
}

const SignUpName = ({ navigation }: Props) => {

  return (
    <BackgroundColor>
      <View className='flex-1 px-[16px] mt-[34px]'>
        <View className=' h-[8px] w-FULL bg-white rounded-[5px]'>
          <View className='h-[8px] w-1/3 bg-[#0B52BC] rounded-[5px] '>
            <View className='h-full w-1 bg-black absolute right-0 top-0 straight-r-[5px]'></View>
          </View>
        </View>

        <View className='mt-[34px]'>
          <Text className='text-[16px] text-white' style={{ fontFamily: 'Lato-700' }}>Create your Stomble account</Text>
        </View>

        <View className='mt-[24px] mb-[16px]'>
          <Text className='text-[14px] text-[#ffffff80]' style={{ fontFamily: 'Lato-400' }}>What's your Full Name?</Text>
        </View>

        <Formik initialValues={{ body: '' }} onSubmit={() => (
          //send the name date to the backend

          //and navigate to the next page
          navigation.navigate('SignUpDOB'))}>
          {(props: any) => (
            <View className='flex-1 justify-between'>
              <View className='flex h-[48px] w-full pl-[12px] justify-center rounded-[5px] border-[1px] border-gray-500 '>
                <TextInput className='text-[16px] text-white '
                  onChangeText={props.handleChange('body')}
                  value={props.values.body}
                  placeholder='Johan'
                  placeholderTextColor='#ffffff80' />
              </View>

              <View className='flex-2 justify-end mb-10'>
                <FlatButton text='NEXT' disabled={props.values.body === '' ? true : false}
                  onPress={props.handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </BackgroundColor>
  )
}

export default SignUpName
