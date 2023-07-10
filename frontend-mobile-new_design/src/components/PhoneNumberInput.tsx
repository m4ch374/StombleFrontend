import { View, Text, Dimensions } from 'react-native'
import React, { FC, useRef, useState, useEffect } from 'react'
import PhoneInput from 'react-native-phone-number-input'
import { Ionicons } from '@expo/vector-icons'

import UseEffectSkipInitial from '../hooks/UseEffectSkipInitial'

type PhoneNumberInputProps = {
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  setError: React.Dispatch<React.SetStateAction<boolean>>
  setPhone: React.Dispatch<React.SetStateAction<string>>
  checkValid: () => void
}
const windowWidth = Dimensions.get('window').width

const PhoneNumberInput: FC<PhoneNumberInputProps> = ({
  setDisabled,
  setError,
  setPhone,
  checkValid,
}) => {
  const phoneInput = useRef<PhoneInput>(null)
  const [countryObj, setCountryObj] = useState<any>()
  const [value, setValue] = useState('')
  const [valid, setValid] = useState(false)

  UseEffectSkipInitial(() => phoneInput.current?.isValidNumber(value), value)

  useEffect(() => {
    const checkPhoneValidation = () => {
      const checkValid = phoneInput.current?.isValidNumber(value)
      if (checkValid) {
        setValid(true)
        setDisabled(false)
        setPhone(value)
        setError(false)
      } else {
        setError(!checkValid)
        setValue('')
        setValid(false)
        setDisabled(true)
      }
    }
    checkPhoneValidation()
    checkValid = checkPhoneValidation
  }, [countryObj, value])

  return (
    <PhoneInput
      withDarkTheme
      ref={phoneInput}
      placeholder='Phone Number'
      defaultValue={value}
      defaultCode='AU'
      layout='first'
      codeTextStyle={{ color: 'white', height: 20 }}
      //autoFocus
      //when blur set the value as the input text
      onChangeText={(text: string) => setValue(text)}
      onChangeCountry={(country) => setCountryObj(country)}
      textInputProps={{
        placeholderTextColor: '#4F4F4F',
        selectionColor: '#FFFFFF',
      }}
      containerStyle={{
        height: 48,
        width: windowWidth - 32,
        borderRadius: 6,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
      }}
      textContainerStyle={{
        backgroundColor: 'transparent',
        borderRadius: 0,
        paddingLeft: 10,
      }}
      textInputStyle={{
        height: 48,
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 19,
        fontWeight: '400',
      }}
      countryPickerButtonStyle={{
        backgroundColor: 'transparent',
        height: 42,
        width: 'auto',
        paddingRight: 10,
        paddingLeft: 10,
        marginRight: 1,
        borderRadius: 0,
      }}
      renderDropdownImage={
        <View className='flex-row items-center'>
          <Text className='text-base font-normal text-white'>
            {countryObj?.name
              ? countryObj.name.toUpperCase().slice(0, 2)
              : 'AU'}{' '}
          </Text>
          <Ionicons name='md-chevron-down' size={20} color='white' />
          <View className='w-0.5 h-6 bg-white ml-2 -mr-3'></View>
        </View>
      }
    />
  )
}

export default PhoneNumberInput
