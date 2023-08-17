// Code from shadow realm

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useTheme } from "native-base"
import { LoginRootTabList } from "types/Navigation"
import BackgroundColour from "components/styled_components/BackgroundColour"
import TabBar from "components/TabBar"
import Home from "screens/login_root/Home"
import Profile from "screens/login_root/Profile"

const BottomTab = createBottomTabNavigator<LoginRootTabList>()

const LoginRootTab = () => {
  const { color } = useTheme().colors

  return (
    <BackgroundColour>
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: color.tabBarBgColor,
            height: 83,
            borderTopColor: "transparent",
          },
          tabBarIcon: ({ focused, size }) => TabBar({ focused, size }),
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{ title: "" }}
        />

        <BottomTab.Screen
          name="Search"
          component={Home}
          options={{ title: "" }}
        />

        <BottomTab.Screen
          name="Notification"
          component={Home}
          options={{ title: "" }}
        />

        <BottomTab.Screen
          name="Profile"
          component={Profile}
          options={{ title: "" }}
        />
      </BottomTab.Navigator>
    </BackgroundColour>
  )
}

export default LoginRootTab
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />;
// }
