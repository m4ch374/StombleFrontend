import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = () =>{
    return<View style = {styles.divider}>

    </View>
}
const styles = StyleSheet.create({
    divider: {
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      width: '118%',
      alignSelf: 'center'
       
    },
  });
  
  export default Divider;