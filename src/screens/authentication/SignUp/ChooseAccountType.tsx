import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import FlatButton from '../../../components/styled_components/FlatButton'
import { Link } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackList } from '../../../types/Navigation'
import BackgroundColour from '../../../components/styled_components/BackgroundColour'


interface Props {
  navigation: NativeStackNavigationProp<AuthStackList, 'ChooseAccountType'>;
}
type item = {
  id: number;
  type: string;
  uri: string;
}
const img = [
  {
    id: 1,
    type: 'Business',
    //uri: require('../../../../assets/registerImage/businessImage.png'),
  },
  {
    id: 2,
    type: 'Personal',
    //uri: require('../../../../assets/registerImage/personalImage.png'),
  },
]
const ChooseAccountType = ({ navigation }: Props) => {
  const [disabled, setDisabled] = useState(true)

  const handelPress = (item: item) => {
    setDisabled(false)
  }
  return (
    <BackgroundColour>
      <View className='flex-1 p-[16px]' style={{ flexDirection: 'column', height: '100%' }}>
        <Text className='text-white text-[16px]' style={{ fontFamily: 'Lato-700' }}>
          Choose Account type
        </Text>
        <View className='flex-column items-center px-[10px] h-[90px] 
        w-full rounded-[5px] border-[#ffffff70] border-[1px] mt-[24px]'>
          <View className='flex-row justify-between items-center mt-[4px]' >
            <View className='flex-row items-center justify-between'>
              <Text className='text-[18px] text-[#ffffff]' style={{ fontFamily: 'Lato-700' }}>
                Business
              </Text>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Image
                  source={require('../../../../assets/ic_radio_unfill.png')} // Replace this with the actual path to your image
                  style={{ width: 18, height: 18 }} // Adjust the width and height as needed
                />
              </View>
            </View>
          </View>
          <Text className='text-[13px] text-[#C1C1C1] justify-start mt-[10px]' style={{ fontFamily: 'Lato-700' }}>
            Best for local businesses, brands, organizations,startups and influencers.
          </Text>
        </View>

        <View className='flex-column items-center px-[10px] h-[90px] 
        w-full rounded-[5px] border-[#ffffff70] border-[1px] mt-[24px]'>
          <View className='flex-row justify-between items-center mt-[4px]' >
            <View className='flex-row items-center justify-between'>
              <Text className='text-[18px] text-[#ffffff]' style={{ fontFamily: 'Lato-700' }}>
                Personal
              </Text>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Image
                  source={require('../../../../assets/ic_radio_unfill.png')} // Replace this with the actual path to your image
                  style={{ width: 18, height: 18 }} // Adjust the width and height as needed
                />
              </View>
            </View>
          </View>
          <Text className='text-[13px] text-[#C1C1C1] justify-start mt-[10px]' style={{ fontFamily: 'Lato-700' }}>
            Best for exploring new trends in business and following your favorite accounts.
          </Text>
        </View>

      </View>
      <View className='flex-2 justify-end'>
        <View className='flex-row justify-center items-center mb-[16px]'>
          <Text className='text-[#C1C1C1] text-[10px]'>
            By continuing you agree to the
          </Text>

          <View className='px-[4px]'>
            <Text className='text-[#326FCB] text-[10px]'>
              <Link to={'TermsAndPrivacy'} >
                Terms of Service
              </Link>
            </Text>
          </View>

          <Text className='text-[#C1C1C1] text-[10px]'>
            and
          </Text>

          <View className='pl-[4px]'>
            <Text className='text-[#326FCB] text-[10px]'>
              <Link to={'TermsAndPrivacy'}>
                Privacy Policies
              </Link>
            </Text>
          </View>
        </View>

        {/* TODO: Logic based nav & popup */}
        <View className="mb-[36px] style={{ marginLeft: '20px', marginRight: '20px' }}">
          <FlatButton
            text="SIGN UP"
            disabled={disabled}
            onPress={() => navigation.navigate('SignUpName')}
          // onPress={togglePopup} // haha found you
          />
        </View>
      </View>

    </BackgroundColour>
  )
}
export default ChooseAccountType