// REFERENCE: REGISTER-54

import { Text, View } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackList } from '../../../types/Navigation'
import FlatButton from '../../../components/styled_components/FlatButton'
import { SelectList } from 'react-native-dropdown-select-list'
import { FontAwesome } from '@expo/vector-icons'
import BackgroundColour from '../../../components/styled_components/BackgroundColour'
import { useAppDispatch } from '../../../redux/hooks'
import { tmpStoreAction } from '../../../redux/reducers/tmpStore.reducer'

type Props = {
  navigation: NativeStackNavigationProp<AuthStackList, 'SignUpGender'>
}

const SignUpGender = ({ navigation }: Props) => {
  const [selected, setSelected] = React.useState("")

  // We are using whatever dob saved in our redux storage as default
  const dispatch = useAppDispatch()

  const data = [
    { key: '1', value: 'Male' },
    { key: '2', value: 'Female' },
    { key: '3', value: 'Others' },
    { key: '4', value: 'Prefer not to say' },
  ]

  const getValueFromKey = (key: string) => {
    return data.filter(d => d.key === key)[0].value.toLocaleLowerCase()
  }
  return (
    <BackgroundColour>
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
              setSelected={setSelected}
              data={data}
              arrowicon={<FontAwesome name="chevron-down" size={12} color={'white'} />}
              searchicon={<FontAwesome name="search" size={12} color={'white'} />}
              search={false}
              placeholder='Select Gender'
              inputStyles={{ color: 'white' }}
              boxStyles={{ borderColor: '#808080' }}
              dropdownStyles={{ borderColor: 'white' }}
              dropdownTextStyles={{ color: 'white' }}
            />

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
            disabled={selected === ''}
            onPress={() => {
              dispatch(tmpStoreAction.setItem({ key: "gender", item: getValueFromKey(selected) }))
              dispatch(tmpStoreAction.setItem({ key: "verifyWithPassword", item: false }))
              navigation.navigate('SetUpPassword')
            }} 
          />
        </View>
      </View>
    </BackgroundColour>
  )
}

export default SignUpGender
