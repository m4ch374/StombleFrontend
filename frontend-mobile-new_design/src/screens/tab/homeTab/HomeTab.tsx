import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import AccountFileCard from '../../../components/AccountFileCard'
import SmallButton from '../../../style/SmallButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { HomeStackList } from '../../../navigation/Navigation.interface'
import React from 'react'

interface Props {
  navigation: NativeStackNavigationProp<HomeStackList, 'HomeScreen'>
}
const data = {
  id: 1,
  img: 'https://mors.in.ua/uploads/posts/2019-05/1558643925_1558582967137257379.png',
  uri: 'https://mors.in.ua/uploads/posts/2019-05/1558643925_1558582967137257379.png',
  text: 'Nike Chadstone',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing Tristique id et in lect ipsum dolor sit amet consectetur adipiscing Tristique id et in Lorem ipsum dolor sit amet, consectetur adipiscing Tristique id et in lectu Read more ipsum dolor sit amet, consectetur adipiscing Tristique id et inLorem ipsum dolor sit amet, consectetur adipiscing Tristique id et in lectu Read more ipsum dolor sit amet, consectetur adipiscing Tristique id et inLorem ipsum dolor sit amet, consectetur adipiscing Tristique id et in lectu Read more ipsum dolor sit amet, consectetur adipiscing Tristique id et inLorem ipsum dolor sit amet, consectetur adipiscing Tristique id et in lectu Read more ipsum dolor sit amet, consectetur adipiscing Tristique id et inLorem ipsum dolor sit amet, consectetur adipiscing Tristique id et in lectu Read more ipsum dolor sit amet, consectetur adipiscing Tristique id et in Lorem ipsum dolor sit amet, consectetur adipiscing Tristique id et in lectu Read more ipsum dolor sit amet, consectetur adipiscing Tristique id et in',
}

const Home = ({ navigation }: Props) => {
  const login = false
  const [pressed, setPressed] = useState(false)
  const [liked, setLiked] = useState<boolean>(false)
  const [follow, setFollow] = useState<boolean>(false)
  const { height, width } = Dimensions.get('window')
  const [shareModal, setShareModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const handleLike = () => {
    if (login) {
      setLiked(!liked)
    } else {
      navigation.navigate('SignUp')
    }
  }
  const handleShare = () => {
    if (login) {
      setShareModal(true)
    } else {
      navigation.navigate('ComingSoon')
    }
  }
  const openMore = () => {
    if (login) {
      setOpenModal(true)
    } else {
      navigation.navigate('SignUp')
    }
  }
  const handleFollow = () => {
    if (login) {
      setFollow(!follow)
    } else {
      navigation.navigate('LoginWithPhone')
    }
  }
  return (
    <ImageBackground
      source={require('../../../../assets/nike_joyride.png')}
      style={{
        height: height,
        width: width,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <ScrollView
        contentContainerStyle={{ display: 'flex' }}
        className='flex-1 p-[12px] relative'
      >
        {/* //scroll up component */}
        {/* <View className='flex-1 justify-end items-center'>
        <FontAwesome name="hand-pointer-o" size={28} color="white" />
        <Text className='text-[24px] text-white'>
          Scroll up for more
        </Text>
        </View> */}

        <View className='flex-1 px-[12px] flex-row justify-around'>
          <View className='flex' style={{ marginTop: height - 250 }}>
            <View className='flex-row justify-start items-center'>
              {/* get the data from backend randomly */}
              <View>
                <AccountFileCard
                  borderRadius={50}
                  uri={data.img}
                  height={42}
                  width={42}
                  imageFit='contain'
                />
              </View>
              <Text
                className='text-white text-[16px] mr-[10px]'
                style={{ fontFamily: 'Lato-900' }}
              >
                {data.text}
              </Text>
              <View>
                {follow ? (
                  <SmallButton
                    bgColor='#0B52BC'
                    height={24}
                    width={76}
                    text='Following'
                    onPress={handleFollow}
                  />
                ) : (
                  <SmallButton
                    bgColor='#0B52BC'
                    height={24}
                    width={76}
                    text='Follow'
                    onPress={handleFollow}
                  />
                )}
              </View>
            </View>

            <View className='mt-[12px] '>
              <TouchableOpacity
                onPress={() => setPressed((pressed) => !pressed)}
                className='mr-[37px]'
              >
                {pressed ? (
                  <Text
                    className='text-white text-[14px] leading-[22.4px]'
                    style={{ fontFamily: 'Lato-700' }}
                  >
                    {data.content}
                  </Text>
                ) : (
                  <Text
                    className='text-white text-[14px] leading-[22.4px]'
                    style={{ fontFamily: 'Lato-700' }}
                  >
                    {data.content.slice(0, 88) + '...Read more'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* icons */}
          <View
            className='fixed gap-[5px]'
            style={{ marginTop: height / 2 - 100 }}
          >
            <View>
              <TouchableOpacity onPress={handleLike}>
                {liked ? (
                  <AntDesign name='heart' size={24} color='#FC4646' />
                ) : (
                  <AntDesign name = 'hearto' size={24} color='white' />
                )}
              </TouchableOpacity>

              <Text
                className='mb-[37.5px] mt-[5px] text-white text-[14px]'
                style={{ fontFamily: 'Lato-400' }}
              >
                 20.9k
              </Text>
            </View>

            <View className='fixed'>
              <TouchableOpacity onPress={handleShare}>
                <Ionicons name='arrow-redo-sharp' size={24} color='white' />
              </TouchableOpacity>
              <Text
                className='mb-[37.5px] mt-[5.5px] text-white text-[14px]'
                style={{ fontFamily: 'Lato-400' }}
              >
                Share
              </Text>
            </View>

            <View className='fixed'>
              <TouchableOpacity onPress={openMore}>
                <Entypo name='dots-three-horizontal' size={24} color='white' />
              </TouchableOpacity>
              <Text
                className='mb-[37.5px] mt-[10px] text-white text-[14px]'
                style={{ fontFamily: 'Lato-400' }}
              >
                More
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

export default Home
