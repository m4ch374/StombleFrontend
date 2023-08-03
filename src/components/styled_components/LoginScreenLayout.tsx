import { SafeAreaView } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import BackgroundColour from './BackgroundColour'

type Props = {
  children: React.ReactNode
}

const LoginScreenLayout = ({ children }: Props) => {
  return (
    <BackgroundColour>
      <SafeAreaView className='flex-1 h-screen pt-20'>{children}</SafeAreaView>
    </BackgroundColour>
  )
}

export default LoginScreenLayout
