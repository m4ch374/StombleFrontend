import { Pressable, Text, View } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = {
  setModalVisable: React.Dispatch<React.SetStateAction<boolean>>
  dateDOB: any
}

const DateModal = ({ setModalVisable, dateDOB }: Props) => {
  const [date, setDate] = useState<Date>(new Date())
  const handleConfirm = () => {
    setDate(date)
    dateDOB = date.toDateString()
  }
  return (
    <View className='flex'>
      <Pressable
        onPress={() => setModalVisable(false)}
        className='flex-end py-[10px]'
      >
        <Text className='text-[20px] text-[#326FCB]'>Done</Text>
      </Pressable>
      <View className='justify-center items-center border-t-[1px] border-[#ffffff80]'>
        {/* <DateTimePickerModal
                    isVisible={true}
                    mode="date"
                    onConfirm={handleConfirm}
                  /> */}
        {/* <DatePicker
          date={date}
          mode="date"
          format="DD/MM/YYYY"
          minDate="01-01-1900"
          maxDate="01-01-2005"
        //   confirmBtnText="Confirm"
        //   cancelBtnText="Cancel"
        //   customStyles={{
        //     dateIcon: {
        //       position: 'absolute',
        //       right: -5,
        //       top: 4,
        //       marginLeft: 0,
        //     },
        //     dateInput: {
        //       borderColor : "gray",
        //       alignItems: "flex-start",
        //       borderWidth: 0,
        //       borderBottomWidth: 1,
        //     },
        //     dateText: {
        //       fontSize: 17,
        //     }
        //   }}
          onDateChange={() => {
            setDate(date);
            dateDOB=date.toDateString()
          }}
        /> */}
      </View>
    </View>
  )
}

export default DateModal
