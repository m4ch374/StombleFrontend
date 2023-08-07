// REFERENCE: Landing page

import { Text, View } from "react-native"
import { Link } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import BackgroundColour from "../../components/styled_components/BackgroundColour"
import FlatButton from "../../components/styled_components/FlatButton"
import Copyright from "../../components/CopyRight"
import { AuthStackList } from "../../types/Navigation"

interface Props {
  navigation: NativeStackNavigationProp<AuthStackList, "FirstLanding">
}

const FirstLanding = ({ navigation }: Props) => {
  return (
    <BackgroundColour>
      <View className="flex-1 px-4 relative mt-7">
        <View className="flex-1 justify-end">
          <View className="absolute top-10 right-0">
            <View
              className={`rounded-md justify-center items-center flex`}
              style={{
                backgroundColor: "rgba(199, 199, 199, 0.3)",
                width: 54,
                height: 32,
              }}
            >
              <Link to={"/HomeScreen"}>
                <Text className="text-white font-semibold">Skip</Text>
              </Link>
            </View>
          </View>
          <Text className="text-white font-extrabold text-center text-[62px]">
            stomble
          </Text>
        </View>

        <View className="flex-1 justify-end">
          <View className=" mb-4 ">
            {/* 
              TODO: Nav based on state, refer to figma design for more details 
              We'd be using the "defaut path" for now (signup) 
            */}
            <FlatButton
              text="LOGIN"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
          <View className="flex-row justify-center items-center align-middle mb-24">
            <Text className="text-sm text-white">
              Don&apos;t have an account?
            </Text>
            <View className="ml-0.5">
              <Link to={"/SignUpName"}>
                <Text className="text-white font-semibold"> Register Now</Text>
              </Link>
            </View>
          </View>

          <View className="mx-auto mb-8">
            <Copyright />
          </View>
        </View>
      </View>
    </BackgroundColour>
  )
}

export default FirstLanding
