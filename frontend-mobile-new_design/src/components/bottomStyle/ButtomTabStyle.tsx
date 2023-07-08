import { Box, Text, useTheme } from "native-base";
import React from "react";

interface Props 
{
  navColorState: string;
  navName: string;
  icon: JSX.Element;
}

const ButomTabStyle = ({ navColorState, navName, icon }: Props) => {
  const { color } = useTheme().colors;
  const primary = color.primary;

  return (
    <Box alignItems={'center'} justifyContent='center'>
      <Box
        h={44}
        w={44}
        alignItems='center'
        justifyContent='center'
        bgColor={navColorState === primary ? color.white : color.white}>
        {icon}
      </Box>
      <Box>
        <Text
          color={navColorState === primary ? color.white : color.primary}
          fontSize={13}
          fontWeight={500}>
          {navName}
        </Text>
      </Box>
    </Box>
  );
};

export default ButomTabStyle;
