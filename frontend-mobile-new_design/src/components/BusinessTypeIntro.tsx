import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const item={
    id:1,
    type:'Business',
    uri:'https://s3-alpha-sig.figma.com/img/e08f/e514/0bb915dbfb7e93c4b8046d728e828e35?Expires=1678665600&Signature=SZiZW6p6j~dyLHWCe5RM1JwmeMrm6pi9TlXvfzaeSVacAR~dYJpsUbSqGTvx7nfqUyxFylvTchOXEE0vUrw0mutRDlB~WzZvJCdV5Ar2k9mg~4nbe3p1KsVOT1027zaEPlHyDCf-pFQP~6EcxD9Xb9YF7Ar~zPZhPz55DwlZj~ebIVRsN6toVQGOgXptww537iE0dxmhJYJJKh4SDMZiqinsaUEve23H3Cb2up8IqLAqjNcT6mnFmvoCKPZ9cR-mGPAWGZNVMF5FGfvCi4fj7wZIYetHpnhbkAEHqVJBsLb9ibLBb4BiD1DbNErXesiNBCg~BB18TvS0chla~tbtYw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
}

const BusinessIntro = () => {
  return (
        <ScrollView className='p-[16px]'>
        <View className='flex-row mt-[56px] gap-[20px] pr-[16px]'>
            <Ionicons name="trending-up" size={24} color="white" />
            <View>
            <Text className='text-white text-[14px] mb-[8px]' style={{fontFamily:'Lato-700'}}>
                Grow and expand your business.
            </Text>
            <Text className='text-[#C1C1C1] text-[12px] mb-[32px] pr-[16px]' style={{fontFamily:'Lato-400'}}>
            Expand and grow your customer base on Stomble by building a loyal following, best of all, you're in control.
            </Text>
            </View>
        </View>

        <View className='flex-row gap-[20px] pr-[16px]'>
        <MaterialCommunityIcons name="flower-outline" size={24} color="white" />
            <View>
            <Text className='text-white text-[14px] mb-[8px]' style={{fontFamily:'Lato-700'}}>
                Learn more about your customers and viewers.
            </Text>
            <Text className='text-[#C1C1C1] text-[12px] mb-[32px] pr-[16px]' style={{fontFamily:'Lato-400'}}>
            Get more insights into your business to inform you about your customers behaviors and patterns.
            </Text>
            </View>
        </View>

        <View className='flex-row gap-[20px] pr-[16px]'>
        <MaterialCommunityIcons name="transit-connection-variant" size={24} color="white" />
            <View>
            <Text className='text-white text-[14px] mb-[8px]' style={{fontFamily:'Lato-700'}}>
                A fully integrated suite of business tools. 
            </Text>
            <Text className='text-[#C1C1C1] text-[12px] mb-[32px] pr-[16px]' style={{fontFamily:'Lato-400'}}>
            Stomble is a technology first business designed to seamless integrate into your business life.
            </Text>
            </View>
        </View>

        <View className='flex-row gap-[20px] pr-[16px]'>
        <MaterialCommunityIcons name="cast-connected" size={24} color="white" />
            <View>
            <Text className='text-white text-[14px] mb-[8px]' style={{fontFamily:'Lato-700'}}>
                More ways to connect with your viewers and customers.
            </Text>
            <Text className='text-[#C1C1C1] text-[12px] mb-[32px] pr-[16px]' style={{fontFamily:'Lato-400'}}>
            A rich set of tools to help you interact, engage and expand your reach.
            </Text>
            </View>
        </View>    
        </ScrollView>  
  )
}

export default BusinessIntro