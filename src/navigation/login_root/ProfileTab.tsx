import React from "react"
import Following from "components/profile/Following"
import {
  MaterialTabBar,
  MaterialTabItem,
  Tabs,
} from "react-native-collapsible-tab-view"
import ProfileHeaderContent from "components/profile/ProfileHeaderContent"
import CustomColor from "constants/Colors"
import VideosLiked from "components/profile/VideosLiked"
import VideosSaved from "components/profile/VideosSaved"

const ProfileTab: React.FC = () => {
  return (
    <Tabs.Container
      containerStyle={{ backgroundColor: CustomColor.background }}
      headerContainerStyle={{
        backgroundColor: CustomColor.background,
        zIndex: 10,
      }}
      renderHeader={() => <ProfileHeaderContent />}
      renderTabBar={props => (
        <MaterialTabBar
          {...props}
          inactiveColor={CustomColor.gray.mid}
          activeColor={CustomColor.white}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "rgba(255, 255, 255, 0.05)",
          }}
          indicatorStyle={{
            backgroundColor: CustomColor.white,
            borderRadius: 9999,
          }}
          TabItemComponent={cprops => (
            <MaterialTabItem
              {...cprops}
              pressColor={CustomColor.background}
              pressOpacity={1}
            />
          )}
        />
      )}
    >
      <Tabs.Tab name="Following">
        <Following />
      </Tabs.Tab>

      <Tabs.Tab name="Liked videos">
        <Tabs.ScrollView>
          <VideosLiked />
        </Tabs.ScrollView>
      </Tabs.Tab>

      <Tabs.Tab name="Saved videos">
        <Tabs.ScrollView>
          <VideosSaved />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
    // <TopTab.Navigator
    //   initialRouteName="Following"
    //   screenOptions={({ route }) => ({
    //     lazy: true,
    //     lazyPlaceholder: () => <View className="h-full bg-background" />,
    //     tabBarStyle: { backgroundColor: CustomColor.background },
    //     tabBarAndroidRipple: { radius: 0 },
    //     tabBarPressColor: "transparent",
    //     tabBarPressOpacity: 0,
    //     tabBarShowLabel: false,
    //     tabBarIconStyle: { width: "auto" },
    //     tabBarIcon: ({ focused }) => (
    //       <ProfileTabIcon focused={focused} route={route} />
    //     ),
    //     tabBarIndicatorStyle: {
    //       backgroundColor: "white",
    //       borderRadius: 99, // I dont see any difference lol
    //     },
    //     tabBarIndicatorContainerStyle: {
    //       borderBottomWidth: 1,
    //       borderColor: "rgba(255, 255, 255, 0.1)", // idk if we need to change this
    //     },
    //   })}
    // >
    //   <TopTab.Screen name="Following" component={Following} />
    //   <TopTab.Screen name="VideosLiked" component={VideosLiked} />
    //   <TopTab.Screen name="VideosSaved" component={VideosSaved} />
    // </TopTab.Navigator>
  )
}

export default ProfileTab
