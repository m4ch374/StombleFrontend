// REFERENCE: Setting - Personal - Close Account

import { useNavigation } from "@react-navigation/native"
import CircleDot from "components/settings/CircleButton"
import FlatButton from "components/styled_components/FlatButton"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import LatoText from "components/styled_components/LatoText"
import { useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"

// TODO: waiting for backend to rewrite this part
type ReasonsOfLeaveType = {
  id: string
  reason: string
}[]

const reasons: ReasonsOfLeaveType = [
  {
    id: "spend_too_much_time",
    reason: "I spend too much time on Stomble",
  },

  {
    id: "concerns",
    reason: "Safety or privacy concerns",
  },
  {
    id: "irrelevant_ads",
    reason: "Too many irrelevant ads",
  },
  {
    id: "trouble_getting_started",
    reason: "Trouble getting started",
  },
  {
    id: "multiple_accounts",
    reason: "I have multiple accounts",
  },
  {
    id: "another_reason",
    reason: "Another reason",
  },
]

const ReasonsOfLeave = () => {
  const { navigate } = useNavigation()
  const [clickedReasons, setClickedReasons] = useState<string[]>([])

  const handleReasonClick = (reasonKey: string) => {
    clickedReasons.includes(reasonKey)
      ? setClickedReasons(clickedReasons.filter(key => key !== reasonKey))
      : setClickedReasons([...clickedReasons, reasonKey])
  }

  return (
    <GeneralScreenLayout>
      <View>
        <LatoText classname="font-lato-bold mb-8">
          Why are you leaving Stomble?
        </LatoText>

        <LatoText classname="text-7 mb-8">
          We’re sorry to see you go. We’d like to know why you are deleting your
          account, so that we could improve the app and support our community.
        </LatoText>

        <View className="w-full flex my-8">
          <FlatList
            scrollEnabled={false}
            data={reasons}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleReasonClick(item.id)}
                  className="w-full flex flex-row justify-between mb-8"
                  activeOpacity={0.8}
                >
                  <LatoText classname="text-7 font-lato-bold">
                    {item.reason}
                  </LatoText>
                  <CircleDot onClicked={clickedReasons.includes(item.id)} />
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>

      <FlatButton
        text={"next"}
        onPress={() => navigate("Settings", { screen: "ConfirmOfLeave" })}
        disabled={false}
      />
    </GeneralScreenLayout>
  )
}

export default ReasonsOfLeave
