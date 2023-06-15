import { extendTheme } from "native-base";

const customTheme = extendTheme({
  colors: {
    color: {
      secondary: '#0B52BC',
      primary: '#10102C',
      dark: '#442E26',
      white: '#fff',
      textColor: 'rgba(0, 0, 0, 0.6)',
      black: '#000',
      gray: '#747373',
      blue: '#0B52BC',
      placeholder: '#D4D4D4',
      lightGray: '#999999',
      lightOrange: '#ffc6a7',
      textGray: '#A8A3A3',
      tabBarBgColor: '#10102C',
    },
  },
  // fontConfig: {
  //   Poppins: {
  //     100: {
  //       normal: 'PoppinsThin',
  //     },
  //     200: {
  //       normal: 'PoppinsExtralight',
  //     },
  //     300: {
  //       normal: 'PoppinsLight',
  //     },
  //     400: {
  //       normal: 'PoppinsRegular',
  //     },
  //     500: {
  //       normal: 'PoppinsMedium',
  //     },
  //     600: {
  //       normal: 'PoppinsSemibold',
  //     },
  //     700: {
  //       normal: 'PoppinsBold',
  //     },
  //     800: {
  //       normal: 'PoppinsExtrabold',
  //     },
  //   },
  // },
  // fonts: {
  //   heading: 'Poppins',
  //   body: 'Poppins',
  //   mono: 'Poppins',
  // },
});

type CustomThemeType = typeof customTheme;

declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}

export default customTheme;
