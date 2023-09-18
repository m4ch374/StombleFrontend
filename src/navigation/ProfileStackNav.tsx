import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CustomColor from "constants/Colors"
import { TouchableWithoutFeedback } from "react-native"
import AddGender from "screens/editProfile/AddGender"
import ChangeBio from "screens/editProfile/ChangeBio"
import ChangeLink from "screens/editProfile/ChangeLink"
import EditProfileIndex from "screens/editProfile/EditProfileIndex"
import { EditProfileStackList } from "types/Navigation"

const EditProfileStack = createNativeStackNavigator<EditProfileStackList>()

const EditProfileStackNav = () => {
  const navigate = useNavigation()
  return (
    <EditProfileStack.Navigator
      screenOptions={{
        headerTintColor: CustomColor.white,
        headerStyle: { backgroundColor: CustomColor.background },
        headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
        headerBackTitleVisible: false,
      }}
      initialRouteName="EditProfileIndex"
    >
      <EditProfileStack.Screen
        name="EditProfileIndex"
        component={EditProfileIndex}
        options={{
          title: "Edit Profile",
          headerLeft: () => (
            <TouchableWithoutFeedback onPress={() => navigate.goBack()}>
              <MaterialIcons name="arrow-back-ios" size={24} color="white" />
            </TouchableWithoutFeedback>
          ),
        }}
      />

      <EditProfileStack.Screen
        name="AddGender"
        component={AddGender}
        options={{ title: "Add Gender" }}
      />

      <EditProfileStack.Screen
        name="ChangeBio"
        component={ChangeBio}
        options={{ title: "Change Bio" }}
      />

      <EditProfileStack.Screen
        name="ChangeLink"
        component={ChangeLink}
        options={{ title: "Change Link" }}
      />
    </EditProfileStack.Navigator>
  )
}

export default EditProfileStackNav
