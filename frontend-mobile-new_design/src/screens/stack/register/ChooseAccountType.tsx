import { View, Text} from 'react-native'
import React,{useState} from 'react'
import LoginScreenLayout from '../../../style/LoginScreenLayout'
import FlatButton from '../../../style/FlatButton'
import { Link } from '@react-navigation/native'
import AccountTypeCard from '../../../components/AccountTypeCard'
import BusinessTypeIntro from '../../../components/BusinessTypeIntro'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackList } from '../../../navigation/Navigation.interface'


interface Props {
  navigation: NativeStackNavigationProp<AuthStackList, 'ChooseAccountType'>;
}
type item={
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
  
];

const ChooseAccountType = ({navigation}: Props) => {
    const [disabled, setDisabled] = useState(true)
    const [selectedItem, setSelectedItem] = useState('')

    const handelPress=(item:item)=>{
        setSelectedItem(item.type)
        setDisabled(false)
        console.log(selectedItem)
    }
  return (
    <LoginScreenLayout>
      <View className='flex-1 p-[16px]'>
        <View className='h-[200px]'>
          <Text
            className='text-[18px] text-[#FFFFFF] font-semibold w-full text-center'
            style={{fontFamily: 'Lato-700'}}>
            Choose Account Type
          </Text>

          <View className='flex-row mt-[21px] justify-around'>
            {img.map((item) => (
              <AccountTypeCard
                type={item.type}
                //sourceImage= {item.uri}
                //onPress={() => handelPress(item)}
                selectedItem={selectedItem}
                key={item.type}
              />
            ))}
          </View>
        </View>

        <View className='h-[300px] '>
          {selectedItem == 'Business' && <BusinessTypeIntro />}
        </View>

        <View className='h-300 pt-8'>
          <View className=' mb-[16px] '>
            <FlatButton
              text='PROCEED'
              disabled={disabled}
              onPress={() =>
                navigation.navigate(
                  selectedItem == 'Business' ? 'SignupBusinessName' : 'SaveLoginInfor'
                )
              }
            />
          </View>

          <View className='flex-row justify-center items-center align-middle'>
            <Text
              className='text-[16px] text-white'
              style={{fontFamily: 'Lato-700'}}>
              Already have an account?
            </Text>
            <View className='ml-[4px]'>
              <Link to={'/LoginWithPhone'}>
                <Text className='text-[#326FCB] font-semibold'>Log In</Text>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </LoginScreenLayout>
  );
}

export default ChooseAccountType