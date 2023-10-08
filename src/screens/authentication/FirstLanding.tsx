// REFERENCE: Landing page

import { Pressable, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import LatoText from "components/styled_components/LatoText"
import BtnWithLoginRegister from "components/BtnWithLoginRegister"
import GeneralScreenLayout from "components/styled_components/GeneralScreenLayout"

const FirstLanding = () => {
  const { navigate } = useNavigation()

  // TODO: Skip before signing up workflow
  const handleSkip = () => {
    alert("Skip to home screen before signing up workflow is under development")
  }

  return (
    <GeneralScreenLayout marginTop="mt-0">
      <View className="flex-1 relative">
        <Pressable className="absolute top-10 right-0" onPress={handleSkip}>
          <LatoText classname="text-secondary font-lato-bold">Skip</LatoText>
        </Pressable>
      </View>

      <LatoText classname="flex-1 text-center text-31 font-AT">
        stomble
      </LatoText>

      <BtnWithLoginRegister
        action="signup"
        btnText="log in"
        disabled={false}
        setDisabled={() => {}}
        onPress={() => navigate("Auth", { screen: "Login" })}
      />
    </GeneralScreenLayout>
  )
}

export default FirstLanding
