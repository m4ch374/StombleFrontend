import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import BackgroundColor from '../../../style/BackgroundColor'
import FlatButton from '../../../style/FlatButton'
import { AuthStackList } from '../../../navigation/Navigation.interface'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'

interface Props {
  navigation: NativeStackNavigationProp<AuthStackList, "SaveLoginInfor">

}

const data={
  id:1,
  img:'https://mors.in.ua/uploads/posts/2019-05/1558643925_1558582967137257379.png',
  uri:'https://files.slack.com/files-pri/TB1QC8X0V-F04T0JPU2DT/nike_joyride.png',
  text:'Nike Chadstone',
  content:'Lorem ipsum dolor sit amet, consectetur adipiscing Tristique id et in lect ipsum dolor sit amet consectetur adipiscing Tristique id et in Lorem ipsum dolor sit amet, consectetur adipiscing Tristique id et in lectu Read more ipsum dolor sit amet, consectetur adipiscing Tristique id et inLorem ipsum dolor sit amet, consectetur adipiscing Tristique id et in lectu Read more ipsum dolor sit amet, consectetur adipiscing Tristique id et inLorem ipsum dolor sit amet, consectetur adipiscing Tristique id et in lectu Read more ipsum dolor sit amet, consectetur adipiscing Tristique id et inLorem ipsum dolor sit amet, consectetur adipiscing Tristique id et in lectu Read more ipsum dolor sit amet, consectetur adipiscing Tristique id et inLorem ipsum dolor sit amet, consectetur adipiscing Tristique id et in lectu Read more ipsum dolor sit amet, consectetur adipiscing Tristique id et in Lorem ipsum dolor sit amet, consectetur adipiscing Tristique id et in lectu Read more ipsum dolor sit amet, consectetur adipiscing Tristique id et in'
}

const SaveLoginInfor = ({navigation}: Props) => {
  const width = Dimensions.get('window').width;
  const handleSave = () => {};    // Save the login details 
  return (
    <BackgroundColor>
      <View className='flex-1 p-[16px] justify-center items-center'>
        <View className='flex-1 h-[150px] pt-[106px]'>
          <Text
            className='text-[24px] text-center text-white'
            style={{fontFamily: 'Lato-700'}}>
            Save your login info?
          </Text>

          <Text
            className='text-[16px] text-[#ffffff70] mt-[16px]'
            style={{fontFamily: 'Lato-400'}}>
            We will save the login info for Nike, so you won't need to enter it
            on your iCloud devices next time you log in.
          </Text>
        </View>

        <View className='bg-white flex justify-center items-center w-[150px] h-[150px] rounded-[75px] mb-[100px]'>
          <Image
            source={{uri: data.img}}
            style={{
              height: 132,
              width: 132,
              borderRadius: 66,
              resizeMode: 'contain',
            }}
          />
        </View>

        <View className='w-full'>
          <FlatButton text='SAVE' onPress={handleSave} />
        </View>

        <View className='mb-[20px] w-full'>
          <FlatButton
            text='Not Now'
            bgColor='transparent'
            onPress={() => navigation.navigate('HomeScreen')}
          />
        </View>
      </View>
    </BackgroundColor>
  );
};

export default SaveLoginInfor
