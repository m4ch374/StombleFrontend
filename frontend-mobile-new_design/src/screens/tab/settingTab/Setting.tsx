import { View, Text, Pressable,Modal,ScrollView} from 'react-native'
import {useState} from 'react'
import SettingButton from '../../../components/SettingButton'
import FlatButton from '../../../style/FlatButton'
import LogoutModal from '../../../components/LogoutModal'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ProfileStackList } from '../../../navigation/Navigation.interface'

import React from 'react'
import { Link } from 'native-base'
import ManageProfile from '../../stack/user/ManageProfile'

interface Props 
{
  navigation: NativeStackNavigationProp<ProfileStackList, 'LogoutModal'>;
}

const AccountData=['Account Information','Manage Profile','Security']
const ActionData=['Notifications']
const SupportData=['Contact Us','Terms and Conditions']

const Setting = ({navigation}: Props) => {
  const [logoutModal, setLogoutModal] = useState(false)

  const switchMode=()=>{
    
  }
  const handleSettingButtonPress = (buttonText: string) => 
  {
    if (buttonText === 'Manage Profile') {
      navigation.navigate('ManageProfile'); 
    }
    else if (buttonText === 'Account Information')
    {
      navigation.navigate('AccountManagement');
    }
  };
  return (
    <ScrollView contentContainerStyle={{justifyContent:'center',alignItems:'center'}} 
    className='flex-1 p-[16px] bg-[#080816]'>
      <Text className='text-white text-[17px] mt-[12px]' style={{fontFamily:'Lato-700'}}></Text>
      <View className='w-full pt-[12px]'>
        <View className='flex mb-[32px]'>
        <Text className='text-[14px] pl-[12px] text-[#ADADAD]  mb-[8px]' style={{fontFamily:'Lato-400'}}>Account Information</Text>
        {AccountData.map((account,index)=>(
          <View className='bg-[#10102C]' key={index+account}>
            {account === 'Manage Profile'}
            <SettingButton 
              text={account}  
              onPress={() => handleSettingButtonPress(account)} 
            />
            
          </View>
        ))}
        </View>
        
        <View className='flex mb-[32px]'>
        <Text className='text-[14px] pl-[12px] text-[#ADADAD] mb-[8px]' style={{fontFamily:'Lato-400'}}>Alerts</Text>
        {ActionData.map((action,index)=>(
          <View className='bg-[#10102C]'>
            <SettingButton 
            text={action} 
            key={action+index}  
            />
            
          </View>
        ))}
        </View>

        <View className='flex mb-[32px]'>
        <Text className='text-[14px] pl-[12px] text-[#ADADAD]  mb-[8px]' style={{fontFamily:'Lato-400'}}>Support</Text>
        {SupportData.map((support,index)=>(
          <View className='bg-[#10102C]'>
          <SettingButton text={support} key={support+index} />
          </View>
        ))}
        </View>

        <View className='mb-[11px]'>
          <FlatButton text='Become a Bussiness'   onPress={() => navigation.navigate('AccountManagement')} />
        </View>

        <View className='mb-[20px]'>
          <FlatButton text='Log Out' bgColor='#10102C' onPress={()=>setLogoutModal(true)}/>
        </View>
        <Modal transparent={true} visible={logoutModal}>
          <View className='w-full h-3/4 bg-[#08081670] justify-center items-center'>
            { <LogoutModal  setLogoutModal={setLogoutModal}  navigation = {navigation} /> }
          </View>
        </Modal>
      </View>
    </ScrollView>
  )
}

export default Setting