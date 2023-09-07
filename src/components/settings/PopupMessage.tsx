import { View } from "react-native"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { tmpStoreAction } from "redux/reducers/tmpStore.reducer"
import { useAppSlector } from "redux/hooks"
import LatoText from "components/styled_components/LatoText"

const PopupMessage = () => {
  const [showPopup, setShowPopup] = useState(true)
  const dispatch = useDispatch()
  const tmpUser = useAppSlector(state => state.tmpStore)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPopup(false)
      dispatch(tmpStoreAction.setItem("message", ""))
    }, 3000)

    return () => clearTimeout(timeout)
  }, [dispatch])

  return (
    // TODO: add animation
    <View
      className={`h-20 px-4 rounded-sm bg-util-banner ${
        showPopup ? "opacity-100" : " opacity-0 "
      } flex justify-center items-center shadow-md`}
    >
      <LatoText classname=" font-lato-bold text-sm">{tmpUser.message}</LatoText>
    </View>
  )
}
export default PopupMessage
