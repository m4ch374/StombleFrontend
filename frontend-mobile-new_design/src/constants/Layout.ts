import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export const Layout = {
  isSmallDevice: deviceWidth < 375,
  deviceWidth,
  deviceHeight
}
  