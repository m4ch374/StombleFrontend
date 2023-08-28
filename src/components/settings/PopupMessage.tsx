import { View, Text } from "react-native"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { useAppSlector } from "redux/hooks"

const PopupMessage = () => {
  const [showPopup, setShowPopup] = useState(true)
  const dispatch = useDispatch()
  const tmpUser = useAppSlector(state => state.tmpStore)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPopup(false)
      dispatch(
        tmpStoreAction.setItem({
          key: "message",
          item: "",
        }),
      )
    }, 3000)

    return () => clearTimeout(timeout)
  }, [dispatch])

  return (
    // TODO: add animation
    <View
      className={`h-[41px] px-4 rounded-[5px] bg-[#232637] ${
        showPopup ? "opacity-95 " : " opacity-0 "
      }justify-center items-center`}
    >
      <Text className=" text-white font-LatoBold text-[14px]">
        {tmpUser.message}
      </Text>
    </View>
  )
}
export default PopupMessage
