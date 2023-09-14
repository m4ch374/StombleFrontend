import SearchIcon from "assets/icons/SearchIcon"
import { FC } from "react"
import { TextInput, View } from "react-native"
import { AntDesign } from "@expo/vector-icons"

type TSearchInput = {
  classname?: string
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  removeText: () => void
}

const SearchInput: FC<TSearchInput> = props => {
  return (
    <View
      className={`
        flex-row
        items-center
        border-[#808080]
        border-2
        rounded-md
        p-6
        mb-3
      `}
    >
      <SearchIcon classname={`h-10`} />
      <TextInput
        className={`
          ml-5
          flex-1
          text-white
          text-[16px]
        `}
        placeholderTextColor="#808080"
        {...props}
      />
      <AntDesign
        name="closecircleo"
        size={20}
        color="#808080"
        onPress={props.removeText}
      />
    </View>
  )
}

export default SearchInput
