import { Pressable, StyleSheet, View } from 'react-native'
import {useState} from 'react'
import React from 'react'

type Props = {
    value:string
}

const RadioButton = ({value}: Props) => {
    const [checked, setChecked] = useState('first')
  return (
    <Pressable >
      <View className='flex justify-center items-center'>
        <Pressable onPress={() => setChecked(value)}>
          <View style={[styles.radioButton, checked === value && styles.radioButtonChecked]}>
            {checked === value && <View style={styles.radioButtonInner} />}
          </View>
        </Pressable>
      </View>
    </Pressable>
  )
}

export default RadioButton

const styles = StyleSheet.create({
    radioButton:{
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#979797',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonChecked: {
        borderColor: '#326FCB',
        backgroundColor:'#326FCB'
      },
      radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#326FCB',
      },
})
      