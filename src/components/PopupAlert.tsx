import {
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native"
import LatoText from "./styled_components/LatoText"

type Props = {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
  alertMsg: string
}

const SimplePopupAlert = ({ showModal, setShowModal, alertMsg }: Props) => {
  return (
    <View>
      <Modal animationType="fade" visible={showModal} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View className=" bg-black/30 w-full h-full flex justify-center items-center">
            <View className="z-100 bg-gray-darkest rounded-md flex items-center justify-center w-[300px] pt-12">
              <View className="flex">
                <LatoText classname="pb-8 text-[18px] text-center font-lato-bold ">
                  Sorry can&apos;t create an account
                </LatoText>
                <LatoText classname="text-gray-lighter text-center pb-8 px-2">
                  {alertMsg}
                </LatoText>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setShowModal(false)
                }}
                className="border-t border-white/10 w-full flex items-center justify-center"
              >
                <LatoText classname="font-lato-bold py-8">OK</LatoText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

export default SimplePopupAlert
