import React from 'react'
import { 
  View, 
  Text, 
  Image, 
  ImageResizeMode, 
  TouchableOpacity, 
} from 'react-native'

type Props = {
  text?: string
  category?: string
  uri: string | undefined
  height?: number | undefined
  width?: number | undefined
  onPress?: () => void
  borderRadius?: number
  imageFit?:ImageResizeMode | undefined
}

const AccountFileCard: React.FC<Props> = ({
  text,
  uri,
  height,
  width,
  onPress,
  category,
  borderRadius,
}) => {
  return (
    <TouchableOpacity onPress={onPress} className='flex-1'>
      <View className='flex-row gap-[16px]'>
        <View
          className=' bg-slate-100 justify-center items-center drop-shadow-3xl'
          style={{ height: height ? height : 48, width: width ? width : 48,
            borderRadius: borderRadius ? borderRadius : 5 }}
        >
          <Image
            source={{ uri: uri }}
            style={{
              height: height ? height : 48,
              width: width ? width : 48,
              resizeMode: 'contain',
            }}
          />
        </View>

        <View className='flex gap-[4px]'>
          {text ? (
            <View className='mx-auto'>
              <Text className='text-[14px] text-[#FFFFFF]'>{text}</Text>
            </View>
          ) : null}
          {category ? (
            <View className='mx-auto'>
              <Text className='text-[12px] text-[#FFFFFF60]'>{category}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default AccountFileCard
