import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react'
import Search from '../screens/tab/searchTab/Search';
import { SearchStackList } from './Navigation.interface';
import { useTheme } from 'native-base';
import { useNavigationState } from '@react-navigation/native';

interface Props {
  navigation: any;
}
const SearchStack = createNativeStackNavigator<SearchStackList>();
const SearchStackNavigator = ({navigation}: Props) => {
 
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name='SearchScreen'
        component={Search}
        options={{
          headerShown: false,
        }}
      />
    </SearchStack.Navigator>
  );
};

export default SearchStackNavigator;