// REFERENCE: <your screen ref on figma>

import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import { useAppSlector } from "redux/hooks"
import { useState } from "react"
import FlatButton from "components/styled_components/FlatButton"
import Arrow from "assets/icons/Arrow"
import InputBlueBg from "components/settings/InputBlueBg"
import { Type } from "types/variantStyle"
import { FlatList, TouchableOpacity, View } from "react-native"
import LatoText from "components/styled_components/LatoText"
import { useDispatch } from "react-redux"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { useNavigation } from "@react-navigation/native"

type GenderData = {
  key: string
  value: string
}

const data: GenderData[] = [
  { key: "1", value: "Male" },
  { key: "2", value: "Female" },
  { key: "3", value: "Others" },
  { key: "4", value: "Prefer not to say" },
]

const AddGender = () => {
  const { navigate } = useNavigation()
  const tmpUser = useAppSlector(state => state.tmpStore)
  const dispatch = useDispatch()
  const [selectedGender, setSelectedGender] = useState(tmpUser.gender)
  const [visible, setVisible] = useState(false)

  // TODO: backend endpoint not ready
  const handleUpdateGender = () => {
    dispatch(
      tmpStoreAction.setState({
        ...tmpUser,
        gender: selectedGender,
        message: "Gender updated successfully",
      }),
    )

    navigate("Settings", { screen: "AccountInfoIndex" })
  }

  return (
    <GeneralScreenLayout>
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setVisible(!visible)
          }}
        >
          <InputBlueBg
            title="Gender"
            variant={Type.outlined}
            userInfo={selectedGender}
            placeholder="Select your gender"
          >
            <Arrow classname="w-6 h-4" />
          </InputBlueBg>
        </TouchableOpacity>

        {visible && (
          <View className="flex border-[1px] border-solid border-gray-mid rounded-md bg-navbar overflow-hidden">
            <FlatList
              data={data}
              scrollEnabled={false}
              keyExtractor={item => item.key}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`flex flex-row justify-between items-center px-8 py-6 ${
                    selectedGender === item.value ? "bg-secondary" : "bg-navbar"
                  } `}
                  activeOpacity={1}
                  onPress={() => {
                    setSelectedGender(item.value)
                  }}
                >
                  <LatoText>{item.value}</LatoText>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => (
                <View className="h-[1px] w-full bg-gray-mid" />
              )}
            />
          </View>
        )}
      </View>

      <FlatButton
        text={"update gender"}
        onPress={handleUpdateGender}
        disabled={selectedGender === ""}
      />
    </GeneralScreenLayout>
  )
}

export default AddGender
