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
            borderTopWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.05)",
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
              style={{
                height: 42,
              }}
              labelStyle={{
                fontFamily: "Lato-400",
                lineHeight: 19.2,
                fontSize: 16,
              }}
              label={cprops.name}
            />
          )}
        />
      )}
    >
      <Tabs.Tab name="Following">
        <Following />
      </Tabs.Tab>

      <Tabs.Tab name="Liked videos">
        <VideosLiked />
      </Tabs.Tab>

      <Tabs.Tab name="Saved videos">
        <VideosSaved />
      </Tabs.Tab>
    </Tabs.Container>
  )
}

export default ProfileTab
