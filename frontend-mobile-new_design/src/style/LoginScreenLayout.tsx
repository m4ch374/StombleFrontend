import { SafeAreaView } from 'react-native'
import React from 'react'
import BackgroundColor from './BackgroundColor'
import { ScrollView } from 'react-native-gesture-handler'

type Props = {
  children: React.ReactNode
}

const LoginScreenLayout = ({ children }: Props) => {
  return (
    <BackgroundColor>
      <SafeAreaView className='flex-1 h-screen pt-20'>{children}</SafeAreaView>
    </BackgroundColor>
  )
}

export default LoginScreenLayout
