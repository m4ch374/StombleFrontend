// REFERENCE: For Users - Business Profile
// idk what that meant lol

import { useNavigation } from "@react-navigation/native"
import React, { createContext, useCallback, useEffect, useState } from "react"
import SwipableModal from "components/styled_components/SwipableModal"
import ModalSettingsBtn from "components/profile/ModalSettingsBtn"
import ProfileHeader from "components/profile/ProfileHeader"
import ProfileTab from "navigation/login_root/ProfileTab"
import { View } from "react-native"
import ProfileHeaderContent from "components/profile/ProfileHeaderContent"
import ScrollRefresh from "components/styled_components/ScrollRefresh"
import { useAppSlector } from "redux/hooks"
import Fetcher from "utils/Fetcher"
import { TGetFollowings } from "types/endpoints"
import { profileEP } from "constants/Endpoint"

// To be removed
export const DataContext = createContext<TGetFollowings["responseType"]>({
  result: [],
})

const Profile: React.FC = () => {
  const navigation = useNavigation()
  const tmpState = useAppSlector(state => state.tmpStore)

  const [visible, setVisible] = useState(false)

  const [refresh, setRefresh] = useState(false)

  // =====================================================================
  // Crappy structure, moving them to its own individual components later
  // =====================================================================
  const [data, setData] = useState<TGetFollowings["responseType"]>({
    result: [],
  })

  const handleRefresh = useCallback(() => {
    ;(async () => {
      const resp = await Fetcher.init<TGetFollowings>(
        "GET",
        profileEP.GET_FOLLOWINGS,
      )
        .withCurrentToken()
        .fetchData()

      if (typeof resp === "undefined") return

      setData(resp)
      setRefresh(false)
    })()
  }, [])

  useEffect(() => {
    handleRefresh()
  }, [handleRefresh])
  // =====================================================================

  return (
    <View className="bg-bgProfile h-full">
      <ProfileHeader
        setModalVisible={setVisible}
        userName={tmpState.fullName}
      />

      <ScrollRefresh
        classname="bg-bgProfile"
        containerStyle={{ flexGrow: 1 }} // tailwind is not allowed for this attr.
        refresh={refresh}
        onRefresh={() => {
          setRefresh(true)
          handleRefresh()
        }}
      >
        <ProfileHeaderContent
          userName={tmpState.fullName}
          profile_link={tmpState.link_icon}
        />

        <DataContext.Provider value={data}>
          <ProfileTab />
        </DataContext.Provider>
      </ScrollRefresh>

      <SwipableModal stateController={[visible, setVisible]}>
        <ModalSettingsBtn
          onPress={() => {
            setVisible(false)
            navigation.navigate("Settings", { screen: "SettingsIndex" })
          }}
        >
          Settings
        </ModalSettingsBtn>

        <ModalSettingsBtn>QR Code</ModalSettingsBtn>

        <ModalSettingsBtn>Copy profile link</ModalSettingsBtn>
      </SwipableModal>
    </View>
  )
}

export default Profile
