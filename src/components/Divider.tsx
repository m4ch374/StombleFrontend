// Copied from shadow realm
// TODO: migrate to tailwind

import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '118%',
    alignSelf: 'center',
       
  },
})

const Divider = () =>{
  return <View style = {styles.divider} />
}
  
export default Divider
