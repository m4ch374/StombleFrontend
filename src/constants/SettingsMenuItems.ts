import { SettingsMenuList } from "types/Navigation"

export type SettingsMenuType = {
  title: string
  menuList: SettingsMenuListType[]
}

export type SettingsMenuListType = {
  key: string
  navItem: string
  navTo: keyof SettingsMenuList
}

export const settingsMenuItems: SettingsMenuType[] = [
  {
    title: "Account Information",
    menuList: [
      { key: "1", navItem: "Account information", navTo: "AccountInfoIndex" },
      { key: "2", navItem: "Manage login info", navTo: "ManageProfiles" },
      // { key: "3", navItem: "Security", navTo: "Security" },
    ],
  },
  {
    title: "Alerts",
    menuList: [
      { key: "1", navItem: "Notifications", navTo: "NotificationSettings" },
    ],
  },
  {
    title: "Support",
    menuList: [
      { key: "1", navItem: "Contact us", navTo: "ContactUs" },
      {
        key: "2",
        navItem: "Terms & conditions",
        navTo: "TermsNConditions",
      },
    ],
  },
]
