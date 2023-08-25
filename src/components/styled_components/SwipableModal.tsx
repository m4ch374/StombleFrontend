import React from "react"
import Modal from "react-native-modal"
import { TouchableWithoutFeedback, View } from "react-native"

type TSwipableModal = {
  children?: string | JSX.Element | JSX.Element[]
  className?: string
  stateController: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const SwipableModal: React.FC<TSwipableModal> = ({
  children,
  className,
  stateController,
}) => {
  const [visible, setVisible] = stateController

  return (
    <Modal
      isVisible={visible}
      className="w-full m-0 p-0"
      statusBarTranslucent={true}
      backdropOpacity={0.3}
      onBackButtonPress={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}
      swipeDirection="down"
      swipeThreshold={50}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View className="flex-1 items-center w-full h-full justify-end bg-transparent">
          <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
            <View
              className={`
                bg-[#202020]
                min-h-[256px]
                w-full
                py-2
                rounded-t-xl
                flex
                items-center
                ${className}
              `}
            >
              <View className="h-[4px] bg-[#ababab] my-2 w-[48px] rounded-full" />
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default SwipableModal
