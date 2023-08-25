import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"
import { RefreshControl, ScrollView, StyleProp, ViewStyle } from "react-native"

const RefreshDisableController = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => false)

type TScrollGeneric = {
  children?: string | JSX.Element | JSX.Element[]
  classname?: string
  containerStyle?: StyleProp<ViewStyle>
}

// ==========================================================================
// Root scroll
// ==========================================================================
type TScrollToRefresh = {
  refresh: boolean
  defaultDisabled?: boolean
  onRefresh?: () => void
} & TScrollGeneric

const ScrollRefresh: React.FC<TScrollToRefresh> = ({
  refresh,
  children,
  classname = "",
  containerStyle = {},
  defaultDisabled = false,
  onRefresh = () => {
    console.log("Refreshed, refresh callback not provided")
  },
}) => {
  const [disabled, setDisabled] = useState(defaultDisabled)

  return (
    <RefreshDisableController.Provider value={setDisabled}>
      <ScrollView
        className={classname}
        contentContainerStyle={containerStyle}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            enabled={!disabled}
            onRefresh={onRefresh}
          />
        }
      >
        {children}
      </ScrollView>
    </RefreshDisableController.Provider>
  )
}
// ==========================================================================

// ==========================================================================
// Child scroll: to prevent scroll propergation
// i.e. Scrolling up on child scroll leading to refresh on the parent scroll
// ==========================================================================

type TScrollRefreshChildScroll = {
  setOnTop?: Dispatch<SetStateAction<boolean>>
} & TScrollGeneric

const ScrollRefreshChildScroll: React.FC<TScrollRefreshChildScroll> = ({
  children,
  classname,
  containerStyle,
  setOnTop,
}) => {
  const setDisableRefresh = useContext(RefreshDisableController)

  return (
    <ScrollView
      className={classname}
      contentContainerStyle={containerStyle}
      onScroll={({ nativeEvent }) => {
        const { contentOffset } = nativeEvent
        contentOffset.y === 0
          ? setDisableRefresh(false)
          : setDisableRefresh(true)

        if (typeof setOnTop !== "undefined")
          contentOffset.y === 0 ? setOnTop(true) : setOnTop(false)
      }}
    >
      {children}
    </ScrollView>
  )
}
// ==========================================================================

export default ScrollRefresh
export { RefreshDisableController, ScrollRefreshChildScroll }
