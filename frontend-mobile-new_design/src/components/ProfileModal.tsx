import { Pressable, Text, View,Modal, ImageBackground } from 'react-native'
import {useState} from 'react'
// import { RadioButton } from 'react-native-paper';
import RadioButton from './RadioButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AccountFileCard from './AccountFileCard';
import { AntDesign } from '@expo/vector-icons';
import AddAccountModal from './AddAccountModal';
import { AuthStackList, HomeStackList } from '../navigation/Navigation.interface';
import React from 'react';


type Props = {
  navigation: NativeStackNavigationProp<AuthStackList, 'AddAccountModal'>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const data=[
    {
      key:1, 
      name:'Monica',
      category:'Personal Mode',
      img: "https://s3-alpha-sig.figma.com/img/7dff/f6fb/b01176436ce7505dcf14095cff81bf58?Expires=1678665600&Signature=U8~SPE0AR~bvnKNxFN4I3G3OBgqEJ7nT6hlrOAbV1vjvuKMqkjMLZi89w2ctmMQAr7lHZuJaBotMJhPwnmJRCagMHVLhv-0qQEzvGsmkXIjocmC9S5gMwGSE9e2uD2QHVyEkmA0rwJP-q5Sw4-cJBi~Zi2jsYugDlPphd2C82g3byEpP9o10p44GiDMgnXJtMSN0WMZxhuOYOqV45YxT2WILMshirx6TEWAIFoAVrNxpK~bZyo7cEvyuxuKI7ljczoGudKuGP-rj9wtGnVNbwGnDBxGt5B-a475in4lASZqOvtioVi4SZLe6DM3yOvCoGfc~-bFh7CukAfaIVBbSaA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    },
    {
      key:2, 
      name:'Duck Duck Go',
      category:'Business Mode',
      img:  "https://s3-alpha-sig.figma.com/img/3153/9122/98940f94e81d57f3ced623043b1e231f?Expires=1678665600&Signature=IJS2iIgbQU8kNEnzpCtTRYxoyg6I~rgkLMO3RKqXGhC7eQos1qajfqRI20H6CSc4pGGufykTf96SbYD-pftqBPygnpRTCuEQzN7F4coi5c9SOIcem7TyM~sNXN9S1o0eVQtknWhjk3132hzr3~PidagRLmHwoP88wh8HMGeMf~F9lWLoVql7penTnPl~TjBX~tXNiPMHNnen79wDOc3yP5Cit9pxVJMTRRij8gF86p1yOhB2E5M5gs2RAsXjGYaAGGv~bRznRT7-Em2LTc8DVxp18jxTXAszvDaVuyscKBKJyV9~bH6CvpM3XvzaGAFtMejATlGzI3r82LBHorMnhg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    },
    {
      key:3, 
      name:'UK Sports coach',
      category:'Business Mode',
      img:"https://s3-alpha-sig.figma.com/img/3d5d/1e68/a4da79b862c4929aeac99391dffed1ff?Expires=1678665600&Signature=bQR7qQz42XLxlOxXjwXOxHAeiQAy6aVrtMFeG~y9RAceaU~RI2IyUvFbzpymhqJuDUyV2NqnQIpJRQ5HP8-EnYtU05oo-~~OM3VV4d8ARoiuPlFZ0SkUZ8sRtbDTrBPzsKZk606fxQRwmmc4s8YJRPX0AwG6vG7dU2Zj40HIsVtmifSGa~Ir42knULqTP4KwgB17Cdv4SX9lAmI-o0-zBwTLdK4fsaOTp7SLe7QUVnC7p6irXujJn8Nf9k5aRYufBljz1r4InETK200tnZH0PTfeAWUydP9~C~u8~ZmI2YmXU6HDo0XLWOEYFj4DaYkHyJQyNJQ2wFfN7cPeuNPVtQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
    },
    {
      key:4, 
      name:'St-Hubert',
      category:'Business Mode',
      img:"https://s3-alpha-sig.figma.com/img/3d5d/1e68/a4da79b862c4929aeac99391dffed1ff?Expires=1678665600&Signature=bQR7qQz42XLxlOxXjwXOxHAeiQAy6aVrtMFeG~y9RAceaU~RI2IyUvFbzpymhqJuDUyV2NqnQIpJRQ5HP8-EnYtU05oo-~~OM3VV4d8ARoiuPlFZ0SkUZ8sRtbDTrBPzsKZk606fxQRwmmc4s8YJRPX0AwG6vG7dU2Zj40HIsVtmifSGa~Ir42knULqTP4KwgB17Cdv4SX9lAmI-o0-zBwTLdK4fsaOTp7SLe7QUVnC7p6irXujJn8Nf9k5aRYufBljz1r4InETK200tnZH0PTfeAWUydP9~C~u8~ZmI2YmXU6HDo0XLWOEYFj4DaYkHyJQyNJQ2wFfN7cPeuNPVtQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
    }
  ]

const ProfileModal = ({navigation,setModalVisible}: Props) => {
    const [checked, setChecked] = useState()
    const [addAccountModalVisible, setAddAccountModalVisible] = useState(false)
  return (
    <View className='h-[375px] bg-[#1C1C1E] px-[16px] gap-[20px]'>
        <View className='h-[3px] w-[64px] bg-[#ABABAB] self-center'></View>
        {data.map(account=>(
            <View key={account.key} className='flex-row justify-between items-center'>
                <AccountFileCard height={48} width={48} category={account.category} uri={account.img} text={account.name} />
                {/* <Pressable className='h-[15px] w-[15px] rounded-[50%] border-[0.5px] border-white flex justify-center items-center relative'> */}
                    {/* <RadioButton  
                        theme={{roundness:50}}
                        value={account.key.toString()}
                        status={checked === account.key.toString() ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(account.key.toString())}
                    />    */}
                {/* </Pressable>  */}
                <RadioButton value={account.key.toString()}/>
            </View>  
        ))}
        <Pressable onPress={()=>setAddAccountModalVisible(true)} className='flex-row items-center' >
            <View className='flex h-[49px] w-[49px] rounded-[50%] border-[0.75px] border-[#4F4F4F] justify-center items-center'>
            <AntDesign name="plus" size={24} color="#ffffff" />
            </View>
            <Text className='text-white text-[14px] ml-[16px]'>Add Account</Text>
        </Pressable>

        <Modal
                animationType="slide"
                transparent={true}
                visible={addAccountModalVisible}>
                <ImageBackground style={{flex:1}} source={require('../../assets/nike_joyride.png')}>
                <View className='flex-1 items-center h-[210px] w-full justify-end bg-[#00000070] '>
                    <AddAccountModal navigation={navigation} setModalVisible={setAddAccountModalVisible} />
                </View>
                </ImageBackground>
        </Modal>
    </View>
  )
}

export default ProfileModal
