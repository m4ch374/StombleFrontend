// Authentication endpoints
export const authEP = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  PRE_SIGN_UP: "/pre-sign-up",
  CONFIRM_PRE_SIGN_UP: "/confirm-pre-sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  CONFIRM_CODE: "/confirm-code",
  CHANGE_PASSWORD: "/change-password",
  RE_SEND_CODE: "/re-send-code",
  SIGN_OUT: "/sign-out",
  CHECK_NUMBER: "/check-number",
  REFRESH_TOKEN: "/refresh-token",
}

// data visualization endpoints
export const dataVisualizationEP = {
  GET_SUMMARY_CONVERSION: "/get-summary-conversion",
  GET_SUMMARY_AGE: "/get-summary-age",
  GET_SUMMARY_GENDER: "/get-summary-gender",
  GET_SUMMARY_VIDEOS_LIKED: "/get-summary-videos-liked",
}

// Account information endpoints
export const accountEP = {
  GET_USER_ACCOUNT_INFORMATION: "/get-user-account-information",
  GET_BUSINESS_ACCOUNT_INFORMATION: "/get-business-account-information",
  SEND_CODE_CHANGE_ATTRIBUTE: "/send-code-change-attribute",
  UPDATE_ICON: "/update-icon",
  DELETE_ICON: "/delete-icon",
  CLOSE_ACCOUNT: "/close-account",
  UPDATE_PERSONAL_INFO: "/update-personal-info",
  GET_REASONS_TO_CLOSE_ACCOUNT: "/get-reasons-to-close-account",
}

// Profile endpoints
export const profileEP = {
  GET_SAVED_VIDEOS: "/get-saved-videos",
  GET_FOLLOWINGS: "/get-followings",
  GET_LIKED_VIDEOS: "/get-liked-videos",
  SET_NOTIFICATION_TOKEN: "set-notification-token",
}

// Setting endpoints
export const settingEP = {
  BECOME_BUSINESS_ACCOUNT: "/become-business-account",
}

// Manage profiles endpoints
export const manageProfilesEP = {
  GET_BUSINESS_ACCOUNT_RELATED_PROFILES:
    "/get-business-account-related-profiles",
}

// Video play endpoints
export const videoPlayEP = {
  GET_VIDEOS_FOR_VIDEO_PLAY: "/get-videos-for-video-play",
  LIKE_VIDEO: "/like-video",
  UNLIKE_VIDEO: "/unlike-video",
  FOLLOW_BUSINESS: "/follow-business",
  UNFOLLOW_BUSINESS: "/unfollow-business",
  REPORT_VIDEO: "/report-video",
  SAVE_RECORD_OF_VIDEO_SHARED: "/save-record-of-video-shared",
  SAVE_VIDEO: "/save-video",
  UN_SAVE_VIDEO: "/un-save-video",
  GET_VIDEOS_NEW_BUSINESS: "/get-videos-new-business",
  GET_NEW_VIDEOS_UPLOADED: "/get-new-videos-uploaded",
}

// Searching endpoints
export const searchingEP = {
  SEARCH_BUSINESSES_AND_VIDEOS: "/search-businesses-and-videos",
}

// Notifications endpoints
export const notificationsEP = {
  GET_NOTIFICATIONS: "/get-notifications",
  READ_ONE_NOTIFICATION: "/read-one-notification",
  READ_ALL_NOTIFICATIONS: "/read-all-notifications",
  DELETE_ONE_NOTIFICATION: "/delete-one-notification",
  DELETE_ALL_NOTIFICATIONS: "/delete-all-notifications",
}

// more endpoints coming soon...
