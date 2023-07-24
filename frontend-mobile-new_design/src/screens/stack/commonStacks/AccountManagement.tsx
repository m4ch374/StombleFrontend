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
import AccountManagementButton from '../../../components/AccountManagementButton'
import EditName from './EditName'

interface Props 
{
  navigation: NativeStackNavigationProp<ProfileStackList, 'AccountManagement'>;
}

const NameData=['Johan']
const MobileNumberData=[' +61 432 700 123']
const EmailData=['Enter Email address']
const PasswordData=['**************']

const AccountManagement = ({navigation}: Props) => {
  const [logoutModal, setLogoutModal] = useState(false)

  const switchMode=()=>{
    
  }
  const handleSettingButtonPress = (buttonText: string) => 
  {
    if (buttonText === 'Edit') 
    {
      navigation.navigate("EditName"); 
    }
  };
  return (
    <ScrollView contentContainerStyle={{justifyContent:'center',alignItems:'center'}} 
    className='flex-1 p-[16px] bg-[#080816]'>
      <Text className='text-white text-[17px] mt-[12px]' style={{fontFamily:'Lato-700'}}></Text>
      <View className='w-full pt-[12px]'>
        <View className='flex mb-[32px]'>
        <Text className='text-[14px] pl-[12px] text-[#ADADAD]  mb-[8px]' style={{fontFamily:'Lato-400'}}>Full Name</Text>
        {NameData.map((account,index)=>(
          <View className='bg-[#10102C]' key={index+account}>
            {account === 'Johan'}
            <AccountManagementButton 
              text={account} 
              text1 = {"Edit"} 
              onPress={() => handleSettingButtonPress("Edit")} 
             
            />
            
          </View>
        ))}
        </View>
        
        <View className='flex mb-[32px]'>
        <Text className='text-[14px] pl-[12px] text-[#ADADAD] mb-[8px]' style={{fontFamily:'Lato-400'}}>Mobile Number</Text>
        {MobileNumberData.map((action,index)=>(
          <View className='bg-[#10102C]'>
            <AccountManagementButton  text={action} 
            key={action+index} 
            text1 = {"change"} 
            />
            
          </View>
        ))}
        </View>

        <View className='flex mb-[32px]'>
          <Text className='text-[14px] pl-[12px] text-[#ADADAD]  mb-[8px]' style={{fontFamily:'Lato-400'}}>Email</Text>
          {EmailData.map((support,index)=>(
            <View className='bg-[#10102C]'>
              <AccountManagementButton text={support} key={support+index} text1 = {"Add"}/>
              
            </View>
          ))}
        </View>
        <View className='flex mb-[32px]'>
          <Text className='text-[14px] pl-[12px] text-[#ADADAD]  mb-[8px]' style={{fontFamily:'Lato-400'}}>Password</Text>
          {PasswordData.map((support,index)=>(
            <View className='bg-[#10102C]'>
              <AccountManagementButton text={support} key={support+index} text1 = {"change"}/>
            </View>
          ))}
        </View>

        <View className='mb-[11px]'>
          <FlatButton text='Delete Account' onPress={() => navigation.navigate('RemoveProfile')} />
        </View>

        <View className='mb-[20px]'>
          {/* <FlatButton text='Log Out' bgColor='#10102C' onPress={()=>setLogoutModal(true)}/> */}
        </View>
        <Modal transparent={true} visible={logoutModal}>
          <View className='w-full h-3/4 bg-[#08081670] justify-center items-center'>
            {/* { <LogoutModal  setLogoutModal={setLogoutModal}  navigation = {navigation} /> } */}
          </View>
        </Modal>
      </View>
    </ScrollView>
  )
}

export default AccountManagement