import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'

type Props={
  children:React.ReactNode 
}
const BackgroundColor = ({children}:any) => {
  return (
    <LinearGradient className='h-full' colors={['#020235','#000000']} start={{x:0,y:0}} end={{x:0,y:1}}>
        <StatusBar style='light' />
        {children}
    </LinearGradient>
  )
}

export default BackgroundColor