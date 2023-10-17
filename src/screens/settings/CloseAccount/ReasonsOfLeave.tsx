// REFERENCE: Setting - Personal - Close Account

import { useNavigation } from "@react-navigation/native"
import CircleDot from "components/settings/CircleButton"
import FlatButton from "components/styled_components/FlatButton"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import LatoText from "components/styled_components/LatoText"
import { useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { ReasonsOfCloseAccount } from "types/endpoints"
import { getReasonsToCloseAccount } from "utils/services/accountInfo"

const ReasonsOfLeave = () => {
  const { navigate } = useNavigation()
  const [clickedReasons, setClickedReasons] = useState<string[]>([])
  const [reasons, setReasons] = useState<ReasonsOfCloseAccount[]>([])

  const handleReasonClick = (reasonKey: string) => {
    clickedReasons.includes(reasonKey)
      ? setClickedReasons(clickedReasons.filter(key => key !== reasonKey))
      : setClickedReasons([...clickedReasons, reasonKey])
  }

  useEffect(() => {
    ;(async () => {
      // endpoint: /get-reasons-to-close-account
      const resp = await getReasonsToCloseAccount()

      if (typeof resp === "undefined") return

      setReasons(resp.reasons)
    })()
  }, [])

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
          {reasons && (
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
                      {item.description}
                    </LatoText>
                    <CircleDot onClicked={clickedReasons.includes(item.id)} />
                  </TouchableOpacity>
                )
              }}
            />
          )}
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
