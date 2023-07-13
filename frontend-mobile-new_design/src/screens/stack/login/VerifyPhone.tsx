import { Text, View, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { useState } from 'react'
import BackgroundColor from '../../../style/BackgroundColor'
import PhoneNumberInput from '../../../components/PhoneNumberInput'
import FlatButton from '../../../style/FlatButton'
import { Link } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackList } from '../../../navigation/Navigation.interface'
import React from 'react'
import { white } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors'
import Divider from '../../../components/Divider'

type Props = {
  navigation: NativeStackNavigationProp<AuthStackList, 'VerifyPhone'>
}

const VerifyPhone = ({ navigation }: Props) => {
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState(null as unknown as boolean)
  const [phone, setPhone] = useState("")
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  }

  function checkPhoneValidation() { }
  return (
    <BackgroundColor>
      <View className='flex-1 px-[16px] pt-[28px] gap-[24px]'>
        <Text className='text-white text-[16px]' style={{ fontFamily: 'Lato-700' }}>
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
              //onPress={() => navigation.navigate('VerifyCode')}
              onPress={togglePopup}

            />
          </View>

          <View className='flex-row justify-center items-center align-middle'>
            <Text className='text-[16px] text-white' style={{ fontFamily: 'Lato-700' }}>
              Already have an account?
            </Text>
            <View className='ml-[2px]'>
              <Link to={'/ChooseAccountType'}>
                <Text className='text-[#326FCB] font-semibold'> Log In</Text>
              </Link>
            </View>
          </View>
        </View>

        <View style={styles.container}>

          <Modal
            animationType="fade"
            transparent={true}
            visible={isPopupVisible}
            onRequestClose={togglePopup}
          >
            <View style={styles.modalContainer}>
              <View style={styles.popup}>
                <Text style={[styles.popupText, { textAlign: 'center' }]}>This mobile number matches your existing account!</Text>
                <Text style={[styles.popupsmallText, { textAlign: 'center' }]}>You already have an account with this contact info.
                  Do you want to create another account with the same mobile number?</Text>

                <View style={styles.containerdivider}>  
                  <Divider />
                </View>

                <TouchableOpacity
                  onPress={() => {
                    togglePopup(); // Close the popup
                    navigation.navigate('SignupBusinessName'); // Navigate to the next page
                  }}
                  >
                    <Text style={[styles.popupsblueText, { textAlign: 'center' }]}>
                      Yes, use the same mobile number
                    </Text>
                  </TouchableOpacity>

                <View style={styles.containerdivider}>
                  <Divider />
                </View>

                <TouchableOpacity onPress={togglePopup}>
                  <Text style={[styles.popupdiffText, { textAlign: 'center' }]}>No, use a different number</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </BackgroundColor>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    fontSize: 18,
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: 'rgba(37, 37, 37, 1)',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
    marginLeft: '5%',
    marginRight: '5%'
  },
  popupText: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Lato-700',
    color: 'white'
  },
  popupsmallText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Lato-700'
  },
  popupdiffText: {
    fontSize: 16,
    marginTop: 10,
    color: 'white',
    fontFamily: 'Lato-700',
  },
  popupsblueText: {
    fontSize: 16,
    marginTop: 2,
    marginBottom: 2,
    color: 'rgba(50, 111, 203, 1)',
    fontFamily: 'Lato-700'
  },
  containerdivider: {
    marginTop: 2,
    padding: 8,
  }

});

export default VerifyPhone
