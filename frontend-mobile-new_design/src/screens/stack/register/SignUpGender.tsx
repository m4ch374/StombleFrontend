import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackList } from '../../../navigation/Navigation.interface'
import BackgroundColor from '../../../style/BackgroundColor'
import FlatButton from '../../../style/FlatButton'
import { SelectList } from 'react-native-dropdown-select-list'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { withTheme } from 'react-native-elements'

type Props = {
  navigation: NativeStackNavigationProp<AuthStackList, 'SignUpGender'>
}

const SignUpGender = ({ navigation }: Props) => {
  const [selected, setSelected] = React.useState("");

  const data = [
    { key: '1', value: 'Male'},
    { key: '2', value: 'Female'},
    { key: '3', value: 'Others'},
    { key: '4', value: 'Prefer not to say' },
  ]
  return (
    <BackgroundColor>
      <View className='flex-1 p-[16px]' style={{ flexDirection: 'column', height: '100%' }}>
        <View className='flex-1'>
          <View className='flex-1 px-[16px] mt-[34px]'>
            <View className='h-[8px] w-full bg-white rounded-[5px]'>
              <View className='h-[8px] w-full bg-[#0B52BC] rounded-[5px]'></View>
            </View>

            <View className='mt-[34px]'>
              <Text className='text-[16px] text-white' style={{ fontFamily: 'Lato-700' }}>Create your Stomble account</Text>
            </View>

            <View className='mt-[24px] mb-[16px]'>
              <Text className='text-[14px] text-[#ffffff80]' style={{ fontFamily: 'Lato-400' }}>
                What is your gender?
              </Text>
            </View>

            <SelectList
              // onSelect={() => alert(selected)}
              setSelected={setSelected}
              data={data}
              arrowicon={<FontAwesome name="chevron-down" size={12} color={'white'} />}
              searchicon={<FontAwesome name="search" size={12} color={'white'} />}
              search={false}
              placeholder='Select Gender'
              inputStyles={{color:'white'}}
              boxStyles={{ 
                borderColor: '#808080',
                
              }}
              dropdownStyles={{borderColor:'white'}}
              //default selected option
              dropdownTextStyles={{color:'white'}}
            />

            {/* <View className='flex-row justify-between items-center px-[8px] h-[48px] w-full rounded-[5px] border-[#ffffff70] border-[1px] '>
               <Pressable>
                <View>
                  <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
                </View>
              </Pressable>
            </View> */}
            <View className='mt-[10px] mb-[16px]'>
              <Text className='text-[14px] text-[#C1C1C1]' style={{ fontFamily: 'Lato-400' }}>
                This will help us tailor your experience
              </Text>
            </View>
          </View>
        </View>
        <View className='flex-2 justify-end mb-10'>
          <FlatButton
            text="PROCEED"
            onPress={() => navigation.navigate('SetUpPassword')} />
        </View>
      </View>
    </BackgroundColor>
  )
}
export default SignUpGender
const styles = StyleSheet.create({})