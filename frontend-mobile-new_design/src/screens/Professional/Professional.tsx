import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React, {useState} from 'react';
import { Dimensions, ScrollView, Text, View,Pressable,Modal } from 'react-native';
import BackgroundColor from '../../style/BackgroundColor';
import ProfileButton from '../../components/ProfileButton';
import ProfileModal from '../../components/ProfileModal';
import AccountFileCard from '../../components/AccountFileCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootTabParamList } from '../../navigation/Navigation.interface';
import UserTabs from '../../navigation/UserTabs';

interface Props {
  navigation: NativeStackNavigationProp<RootTabParamList, 'Professional'>;
}
const profileData=
  {
    key:1, 
    name:'Johan',
    //job:'Personal Account',
    img: "https://s3-alpha-sig.figma.com/img/7dff/f6fb/b01176436ce7505dcf14095cff81bf58?Expires=1678665600&Signature=U8~SPE0AR~bvnKNxFN4I3G3OBgqEJ7nT6hlrOAbV1vjvuKMqkjMLZi89w2ctmMQAr7lHZuJaBotMJhPwnmJRCagMHVLhv-0qQEzvGsmkXIjocmC9S5gMwGSE9e2uD2QHVyEkmA0rwJP-q5Sw4-cJBi~Zi2jsYugDlPphd2C82g3byEpP9o10p44GiDMgnXJtMSN0WMZxhuOYOqV45YxT2WILMshirx6TEWAIFoAVrNxpK~bZyo7cEvyuxuKI7ljczoGudKuGP-rj9wtGnVNbwGnDBxGt5B-a475in4lASZqOvtioVi4SZLe6DM3yOvCoGfc~-bFh7CukAfaIVBbSaA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    //email:'johanuxdesign.com'
  }

const Professional = ({navigation}: Props)=> {
  const width=Dimensions.get('window').width;
  const [modalVisible, setModalVisible] = useState(false)
  const handleAccount=()=>{
    setModalVisible(true)
  }
  const handleShare=()=>{

  }
  const handleEditProfile=()=>{

  }

  return (
    <BackgroundColor>
      <ScrollView
        className='px-[16px] pt-[32px] flex-1'>
        <View className='flex-row justify-between mb-[12px]'>
          <View className='flex-row'>
            <Text
              className='text-[20px] text-white'
              style={{fontFamily: 'Lato-700'}}>
              Johan
            </Text>
            <Pressable onPress={handleAccount}>
              <MaterialIcons
                name='keyboard-arrow-down'
                size={28}
                color='white'
              />
            </Pressable>
          </View>

          <View className='flex-row gap-[25px]'>
            <View className='relative'>
              <FontAwesome5 name='bell' size={20} color='white' />
              <View className='h-3 w-3  bg-[#ff0000d9] flex justify-center items-center absolute top-[1px] left-[-4px]'>
                <Text className='text-white text-[8px]'>1</Text>
              </View>
            </View>
            <Entypo name='dots-three-vertical' size={20} color='white' />
          </View>
        </View>

        <View className='flex-row w-full justify-start gap-[24px] items-center mb-[8px]'>
          <View>
            <AccountFileCard borderRadius={50} height={80} width={80} uri={profileData.img} />
          </View>

          {/* <View className='flex justify-center items-center mr-[14px]'>
            <Text
              className='text-white text-[17px]'
              style={{fontFamily: 'Roboto-400'}}>
              1K
            </Text>
            <Text
              className='text-white text-[12px]'
              style={{fontFamily: 'Roboto-400'}}>
              Video
            </Text>
          </View>

          <View className='flex justify-center items-center mr-[14px]'>
            <Text
              className='text-white text-[17px]'
              style={{fontFamily: 'Roboto-400'}}>
              60K
            </Text>
            <Text
              className='text-white text-[12px]'
              style={{fontFamily: 'Roboto-400'}}>
              Followers
            </Text>
          </View>

          <View className='flex justify-center items-center'>
            <Text
              className='text-white text-[17px]'
              style={{fontFamily: 'Roboto-400'}}>
              4
            </Text>
            <Text
              className='text-white text-[12px]'
              style={{fontFamily: 'Roboto-400'}}>
              Following
            </Text>
          </View> */}
        </View>

        <View className='flex'>
          <Text
            className='text-white text-[14px] mb-[6px]'
            style={{fontFamily: 'Lato-700'}}>
            {profileData.name}
          </Text>
          <Text
            className='text-[#A3A3A3] text-[12px] mb-[4px]'
            style={{fontFamily: 'Lato-400'}}>
            {/* {profileData.job} */}
          </Text>
          <Text
            className='text-[#44A1DB] text-[12px] mb-[24px]'
            style={{fontFamily: 'Lato-400'}}>
            {/* {profileData.email} */}
          </Text>
        </View>

        <View className='flex-row justify-between mb-[34px]'>
          {/* <ProfileButton text='Share Profile' onPress={handleShare} />
          <ProfileButton text='Edit Profile' onPress={handleEditProfile} /> */}
        </View>

        <View className='flex-2 h-[700px]'>
          <UserTabs navigation={undefined} />
        </View>

        <Modal animationType='slide' transparent={true} visible={modalVisible}>
          <Pressable
            onPress={() => setModalVisible(false)}
            className='flex-1 w-full bg-[#00000070] justify-end'>
            {/* { <ProfileModal navigation={navigation} setModalVisible={setModalVisible} />} */}
          </Pressable>
        </Modal>
      </ScrollView>
    </BackgroundColor>
  );
}

export default Professional