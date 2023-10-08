// REFERENCE: follow-topics

import { useNavigation } from "@react-navigation/native"
import FieldSeperator from "components/FieldSeperator"
import FlatButton from "components/styled_components/FlatButton"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"
import LatoText from "components/styled_components/LatoText"
import CustomColor from "constants/Colors"
import { useState, useEffect } from "react"
import {
  Button,
  FlatList,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native"

const followingStlye = "border border-white"
const notFollowedStlye = "bg-primary"

// dummy topic data
type TopicsType = {
  id: string
  topic: string
}[]
const topicOptions: TopicsType = [
  { id: "fashion_beauty", topic: "Fashion & Beauty" },
  {
    id: "food_drink",
    topic: "Food & Drink",
  },
  {
    id: "health_fitness",
    topic: "Health & Fitness",
  },
  {
    id: "home_garden",
    topic: "Home & Garden",
  },
  {
    id: "parenting",
    topic: "Parenting",
  },
  {
    id: "pets",
    topic: "Pets",
  },
  {
    id: "travel",
    topic: "Travel",
  },
  {
    id: "tech",
    topic: "Tech",
  },
  {
    id: "entertainment",
    topic: "Entertainment",
  },
  {
    id: "sports",
    topic: "Sports",
  },
  {
    id: "news",
    topic: "News",
  },
  {
    id: "politics",
    topic: "Politics",
  },
  {
    id: "business",
    topic: "Business",
  },
]

const FollowTopics = () => {
  const navigation = useNavigation()
  const [clickedTopics, setClickedTopics] = useState<string[]>([])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        clickedTopics.length === 0 && (
          <Button
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "LoginRoot" }],
              })
            }}
            title="Skip"
            color={CustomColor.secondary}
          />
        ),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedTopics])

  const handleFollowTopics = (topicId: string) => {
    if (clickedTopics.includes(topicId)) {
      setClickedTopics(clickedTopics.filter(key => key !== topicId))
    } else {
      setClickedTopics([...clickedTopics, topicId])
    }
  }

  return (
    <GeneralScreenLayout paddingX="px-0" marginTop="mt-8">
      <View className="flex-1">
        <View className="flex px-8 my-8">
          <LatoText classname="font-lato-bold">
            Select a few topics you love for a tailored experience.
          </LatoText>
        </View>

        <View className="pb-28">
          <FlatList
            data={topicOptions}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                className="flex flex-row my-6 mx-8 justify-between items-center"
                activeOpacity={1.0}
              >
                <LatoText classname="text-7 font-lato-bold ">
                  {item.topic}
                </LatoText>
                <Pressable
                  onPress={() => handleFollowTopics(item.id)}
                  className={`
              w-[76px]
              h-[32px]
              flex
              justify-center
              items-center
              rounded-sm
              ${
                clickedTopics.includes(item.id)
                  ? notFollowedStlye
                  : followingStlye
              }
            `}
                >
                  <LatoText classname="font-lato-bold text-6">
                    {clickedTopics.includes(item.id) ? "Follow" : "Following"}
                  </LatoText>
                </Pressable>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => (
              <FieldSeperator classname="bg-navbar" />
            )}
          />
        </View>
      </View>

      <View className="bg-background px-8 pt-8 border-t-[1px] border-solid border-navbar w-full">
        <FlatButton
          text={"finish"}
          onPress={() => {
            // TODO: send clicked topics to backend (under considering)
            console.log("followed topics", clickedTopics)
            navigation.reset({
              index: 0,
              routes: [{ name: "LoginRoot" }],
            })
          }}
          disabled={clickedTopics.length === 0}
        />
      </View>
    </GeneralScreenLayout>
  )
}

export default FollowTopics
