import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation,EvilIcons,Ionicons,Octicons } from '@expo/vector-icons';

type Props = {
    focused:boolean,
    size:number
}

const TabBar = (props: Props) => {
    const route=useRoute()
    props.size=20

    let iconName:string,text:string,Icon:any;
    if(route.name==='Home'){
        Icon=Foundation
        iconName='home'
        text='Home'
    }
    else if(route.name==='ProfileTab'){
        Icon=EvilIcons
        iconName='user'
        text='Profile'
    }else if(route.name==='Search'){
        Icon=Ionicons 
        iconName='search-outline'
        text='Search'
    }else{
        Icon=MaterialCommunityIcons  
        iconName='professional-hexagon'
        text='Profession'
    }
    return (
      <View
        className='flex h-full w-[95px] border-t-2 justify-center'
        style={{borderTopColor: props.focused ? '#949494' : 'transparent'}}>
        <View className='items-center'>
          <Icon
            name={iconName}
            size={props.size}
            color={props.focused ? 'white' : '#FFFFFF80'}
          />
        </View>
        {props.focused && (
          <Text
            className='text-white text-[14px] leading-[17.5px] text-center'
            style={{fontFamily: 'Lato-700'}}>
            {text}
          </Text>
        )}
      </View>
    );
}

export default TabBar