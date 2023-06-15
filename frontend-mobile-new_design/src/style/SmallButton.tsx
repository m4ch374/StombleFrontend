import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'

interface SmallButtonProps {
  width?: string | number | undefined
  height?: string | number | undefined
  bgColor?: string
  text: string
  onPress?: () => void
}

const SmallButton = ({
  width,
  height,
  bgColor,
  text,
  onPress,
}: SmallButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='rounded-md justify-center items-center'
      style={{
        backgroundColor: bgColor ? bgColor : '#C7C7C7',
        width: width ? width : 48,
        height: height ? height : 29,
      }}
    >
      <Text
        className='text-xs py-1.5 px-3 text-white'
        style={{ fontFamily: 'Lato-400' }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default SmallButton
