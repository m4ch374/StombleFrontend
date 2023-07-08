import { View, Text } from "react-native";
import React from "react";

const Copyright = React.memo(() => {
  return (
    <View className="flex-row justify-between w-[161px]">
      <Text className="text-[10px] leading-[11.15px] font-normal text-white">
        Copyright 
      </Text>
      <Text className="text-[10px] leading-[11.15px] font-normal text-white">
        2022-2023 STOMBLE
      </Text>
    </View>
  );
})

export default Copyright;