import { Button, Text, TextInput, View, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import BackgroundColor from '../../../style/BackgroundColor'
import FlatButton from '../../../style/FlatButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackList } from '../../../navigation/Navigation.interface'
import { MaterialIcons } from '@expo/vector-icons';
import DateModal from '../../../components/DateModal'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Alert } from 'react-native';




type Props = {
  navigation: NativeStackNavigationProp<AuthStackList, 'SignUpDOB'>
}

const SignUpDate = ({ navigation }: Props) => {
  const [dateModal, setDateModal] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  
  


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    const selected = new Date(date);
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  
    if (selected > eighteenYearsAgo) {
      Alert.alert("Sorry, can't create an Account ", 'To create a Stomble account , your minimum age must be 13 years or over.');
      return;
    }
    
    setSelectedDate(selected.toLocaleDateString());
    hideDatePicker();
  };
  

  return (
    <BackgroundColor>
      <View className='flex-1 px-[16px] mt-[34px]'>
      <View className=' h-[8px] w-FULL bg-white rounded-[5px]'>
          <View className='h-[8px] w-2/3 bg-[#0B52BC] rounded-[5px] '>
            <View className='h-full w-1 bg-black absolute right-0 top-0 straight-r-[5px]'></View>
          </View>
        </View>

        <View className='mt-[34px]'>
          <Text className='text-[16px] text-white' style={{ fontFamily: 'Lato-700' }}>Create your Stomble account</Text>
        </View>

        <View className='mt-[24px] mb-[16px]'>
          <Text className='text-[14px] text-[#ffffff80]' style={{ fontFamily: 'Lato-400' }}>
            When is your date of birth?
          </Text>
        </View>

        <Formik initialValues={{ body: '' }} onSubmit={() => (
          //send the body date to the backend

          //and navigate to next page
          navigation.navigate('SignUpGender'))}>
          {(props: any) => (
            <View className='flex-1 p-[16px]' style={{ flexDirection: 'column', height: '100%' }}>

              <View className='flex-1'>
                <View className='flex-row justify-between items-center px-[8px] h-[48px] w-full rounded-[5px] border-[#ffffff70] border-[1px] '>
                  <View>
                    <TextInput className='text-[16px] text-white'
                      editable={false}
                      selectTextOnFocus={false}
                      onChangeText={props.handleChange('body')}
                      value={selectedDate}
                      placeholder='01 January 2000'
                      placeholderTextColor='#ffffff' />
                  </View>

                  <Pressable onPress={showDatePicker}>
                    <View>
                      <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
                    </View>
                  </Pressable>

                </View>

                <View>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker} />
                </View>


              </View>
              <View className='flex-2 justify-end mb-10'>
              <FlatButton text='NEXT' disabled={props.values.body === '' ? true : false}
                onPress={props.handleSubmit} />

                <Modal animationType='slide' transparent={true} visible={dateModal}>
                  <View className='flex-1 w-full justify-end'>
                    <DateModal setModalVisable={setDateModal} dateDOB={props.values.body} />
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker} />
                  </View>
                </Modal>

              </View>
             
            </View>
          )}

        </Formik>

      </View>
    </BackgroundColor>
  )
}

export default SignUpDate
