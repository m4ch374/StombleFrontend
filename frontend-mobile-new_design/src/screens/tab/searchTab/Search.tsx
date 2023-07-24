
import 
{
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  Dimensions,
} 
from "react-native";
import React, { useEffect, useState } from "react";
import { SearchBar } from "react-native-elements";
import { HomeStackList } from "../../../navigation/Navigation.interface";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ISearchBarProps {
  onSearch?: (searchTerm: string) => void;
  navigation: NativeStackNavigationProp<HomeStackList, 'Search'>
}

interface User {
  name: {
    first: string;
    last: string;
  };
  login: {
    username: string;
  };
  picture: {
    large: string;
  };
}

const Search = ({onSearch, navigation}: ISearchBarProps) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => 
  {
    fetchData('https://randomuser.me/api/?results=10');
  }, []);

  const fetchData = async (url: any) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.results);
      setFilteredData(json.results);
      console.log(json.results);
    } 
    catch (error) 
    {
      console.error(error);
    }
  };

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = data.filter((item:any) => {
        const itemData = item.name.first
          ? item.name.first.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };
  const {height, width} = Dimensions.get('window');


  return (
    <View className='flex-1 py-6' style={{height: height, width: width}}>
      <TextInput
        inlineImageLeft='search_icon'
        placeholder='Search'
        clearButtonMode='always'
        autoCorrect={false}
        autoCapitalize='none'
        value={searchTerm}
        onChangeText={(text) => {
          setSearchTerm(text);
          searchFilterFunction(text);
        }}
        className='mx-5 mt-5 p-2 border-2 rounded-lg border-slate-400'
      />
      {/* you can enable either one of search bar */}
      {/* <SearchBar
        placeholder="Search"
        onChangeText={(text) => {
          setSearchTerm(text);
          searchFilterFunction(text);
        }}
        value={searchTerm}
        platform="ios"
      /> */}

      <Text className='mt-2 ml-2 font-bold text-[20px] text-left'>
        Accounts
      </Text>
      <FlatList
      className="h-screen py-4"
        data={filteredData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}: {item: User}) => (
          <View className='flex-row items-center mt-5 ml-5'>
            <Image
              source={{uri: item.picture.large}}
              className='w-[50px] h-[50px] rounded-full'
            />
            <View>
              <Text className='text-[17px] ml-5 font-[600]'>
                {item.name.first} {item.name.last}
              </Text>
              <Text className='text-[14px] ml-5 text-gray-500'>
                {item.login.username}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Search;
