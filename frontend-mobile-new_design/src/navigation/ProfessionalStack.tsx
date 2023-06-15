import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ProfessionalStackList } from './Navigation.interface';
import { useTheme } from 'native-base';
import { useNavigationState } from '@react-navigation/native';
import Professional from '../screens/Professional/Professional';

const ProfessionalStack = createNativeStackNavigator<ProfessionalStackList>();

interface Props {
  navigation: any;
}
const ProfessionalStackNavigator = ({navigation}: Props) => {

  return (
    <ProfessionalStack.Navigator
      initialRouteName='BusinessInfo' screenOptions={{headerShown:false}}>
      <ProfessionalStack.Screen
        name='BusinessInfo'
        component={Professional}                    
      />
    </ProfessionalStack.Navigator>
  );
};

export default ProfessionalStackNavigator;
