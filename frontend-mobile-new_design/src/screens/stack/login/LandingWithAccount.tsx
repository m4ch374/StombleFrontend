import { View, Text, Modal, ScrollView, TouchableOpacity} from 'react-native'
import {useState} from 'react'
import BackgroundColor from '../../../style/BackgroundColor'
import AccountFileCard from '../../../components/AccountFileCard'
import SmallButton from '../../../style/SmallButton';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AddAccountModal from '../../../components/AddAccountModal'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackList } from '../../../navigation/Navigation.interface';

interface Props {
  navigation: NativeStackNavigationProp<AuthStackList, 'SignUp'>;
}
const existedAccounts=[
  {
    key:1, 
    name:'Monica',
    category:'Personal Account',
    img: "https://s3-alpha-sig.figma.com/img/7dff/f6fb/b01176436ce7505dcf14095cff81bf58?Expires=1678665600&Signature=U8~SPE0AR~bvnKNxFN4I3G3OBgqEJ7nT6hlrOAbV1vjvuKMqkjMLZi89w2ctmMQAr7lHZuJaBotMJhPwnmJRCagMHVLhv-0qQEzvGsmkXIjocmC9S5gMwGSE9e2uD2QHVyEkmA0rwJP-q5Sw4-cJBi~Zi2jsYugDlPphd2C82g3byEpP9o10p44GiDMgnXJtMSN0WMZxhuOYOqV45YxT2WILMshirx6TEWAIFoAVrNxpK~bZyo7cEvyuxuKI7ljczoGudKuGP-rj9wtGnVNbwGnDBxGt5B-a475in4lASZqOvtioVi4SZLe6DM3yOvCoGfc~-bFh7CukAfaIVBbSaA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    key:2, 
    name:'Duck Duck Go',
    category:'Business Account',
    img:  "https://s3-alpha-sig.figma.com/img/3153/9122/98940f94e81d57f3ced623043b1e231f?Expires=1678665600&Signature=IJS2iIgbQU8kNEnzpCtTRYxoyg6I~rgkLMO3RKqXGhC7eQos1qajfqRI20H6CSc4pGGufykTf96SbYD-pftqBPygnpRTCuEQzN7F4coi5c9SOIcem7TyM~sNXN9S1o0eVQtknWhjk3132hzr3~PidagRLmHwoP88wh8HMGeMf~F9lWLoVql7penTnPl~TjBX~tXNiPMHNnen79wDOc3yP5Cit9pxVJMTRRij8gF86p1yOhB2E5M5gs2RAsXjGYaAGGv~bRznRT7-Em2LTc8DVxp18jxTXAszvDaVuyscKBKJyV9~bH6CvpM3XvzaGAFtMejATlGzI3r82LBHorMnhg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    key:3, 
    name:'UK Sports coach',
    category:'Business Account',
    img:"https://s3-alpha-sig.figma.com/img/3d5d/1e68/a4da79b862c4929aeac99391dffed1ff?Expires=1678665600&Signature=bQR7qQz42XLxlOxXjwXOxHAeiQAy6aVrtMFeG~y9RAceaU~RI2IyUvFbzpymhqJuDUyV2NqnQIpJRQ5HP8-EnYtU05oo-~~OM3VV4d8ARoiuPlFZ0SkUZ8sRtbDTrBPzsKZk606fxQRwmmc4s8YJRPX0AwG6vG7dU2Zj40HIsVtmifSGa~Ir42knULqTP4KwgB17Cdv4SX9lAmI-o0-zBwTLdK4fsaOTp7SLe7QUVnC7p6irXujJn8Nf9k5aRYufBljz1r4InETK200tnZH0PTfeAWUydP9~C~u8~ZmI2YmXU6HDo0XLWOEYFj4DaYkHyJQyNJQ2wFfN7cPeuNPVtQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  },
  {
    key:4, 
    name:'St-Hubert',
    category:'Business Account',
    img:"https://s3-alpha-sig.figma.com/img/3d5d/1e68/a4da79b862c4929aeac99391dffed1ff?Expires=1678665600&Signature=bQR7qQz42XLxlOxXjwXOxHAeiQAy6aVrtMFeG~y9RAceaU~RI2IyUvFbzpymhqJuDUyV2NqnQIpJRQ5HP8-EnYtU05oo-~~OM3VV4d8ARoiuPlFZ0SkUZ8sRtbDTrBPzsKZk606fxQRwmmc4s8YJRPX0AwG6vG7dU2Zj40HIsVtmifSGa~Ir42knULqTP4KwgB17Cdv4SX9lAmI-o0-zBwTLdK4fsaOTp7SLe7QUVnC7p6irXujJn8Nf9k5aRYufBljz1r4InETK200tnZH0PTfeAWUydP9~C~u8~ZmI2YmXU6HDo0XLWOEYFj4DaYkHyJQyNJQ2wFfN7cPeuNPVtQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  }
]
const LandingWithAccount = ({navigation}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <BackgroundColor>
      <View className='flex-1 px-[16px]'>
        <View className='flex relative'>
          <View className='positive top-[55px] left-[330px]'>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name='settings-outline' size={18} color='#ffffff' />
            </TouchableOpacity>
          </View>
          <Text
            className='text-white font-extrabold text-center text-[36px] mt-[104px]'
            style={{fontFamily: 'AT'}}>
            STOMBLE
          </Text>

          <Text
            className='text-white text-[16px] mt-[32px] mb-[24px]'
            style={{fontFamily: 'Lato-700'}}>
            Select the accounts you want to login
          </Text>
        </View>

        <ScrollView className='flex-1 gap-[20px]'>
          {/* <FlatList data={existedAccounts} horizontal={true}
          renderItem={(account)=>( 
            <View className='items-center px-[16px]'>
              <BusinessUserFileCard text={account.item.name} uri={account.item.img} id={account.item.key} index={account.index} height={80} width={80} rounded={50} onPress={onPress}/>
            </View>
        )}/> */}
          {existedAccounts.map((account) => (
            <View className='flex-1 flex-row justify-between' key={account.key}>
              <AccountFileCard
                text={account.name}
                uri={account.img}
                height={48}
                width={48}
                borderRadius={50}
                category={account.category}
              />

              <SmallButton
                width={60}
                height={30}
                text='LOGIN'
                onPress={() => navigation.navigate('SignUpBusiness')}
              />
            </View>
          ))}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className='flex h-[48px] w-[48px] rounded-[50%] border-[0.75px] border-[#4F4F4F] justify-center items-center'>
            <AntDesign name='plus' size={24} color='#ffffff' />
          </TouchableOpacity>
          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}>
            <View className='flex-1 items-center h-[210px] w-full justify-end '>
              {/* <AddAccountModal navigation={navigation} setModalVisible={setModalVisible} /> */}
            </View>
          </Modal>
        </ScrollView>
      </View>
    </BackgroundColor>
  );
}

export default LandingWithAccount