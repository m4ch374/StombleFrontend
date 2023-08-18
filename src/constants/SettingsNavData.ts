import { SettingStackList } from "types/Navigation"

type ISettingsNavData = {
  title: string
  items: {
    key: string
    navItem: string
    navTo: keyof SettingStackList
  }[]
}

export const settingsNavData: ISettingsNavData[] = [
  {
    title: "Account Information",
    items: [
      { key: "1", navItem: "Account Information", navTo: "AccountInfo" },
      { key: "2", navItem: "Manage Profiles", navTo: "ManageProfiles" },
      { key: "3", navItem: "Security", navTo: "Security" },
    ],
  },
  {
    title: "Alerts",
    items: [{ key: "1", navItem: "Notifications", navTo: "Notifications" }],
  },
  {
    title: "Support",
    items: [
      { key: "1", navItem: "Contact Us", navTo: "ContactUs" },
      {
        key: "2",
        navItem: "Terms and Conditions",
        navTo: "TermsNConditions",
      },
    ],
  },
]
