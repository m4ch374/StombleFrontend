import { profileEP } from "constants/Endpoint"
import {
  TGetFollowings,
  TGetLikedVideos,
  TGetSavedVideos,
  TSetNotificationToken,
} from "types/endpoints"
import Fetcher from "utils/Fetcher"

// NOTICE: only params "take" is required, others are optional

// /get-followings
export const getFollowings = (params: TGetFollowings["requestType"]) => {
  return Fetcher.init<TGetFollowings>("GET", profileEP.GET_FOLLOWINGS)
    .withParams(params)
    .withCurrentToken()
    .fetchData()
}

// /get-liked-videos
export const getLikedVideos = (params: TGetLikedVideos["requestType"]) => {
  return Fetcher.init<TGetLikedVideos>("GET", profileEP.GET_LIKED_VIDEOS)
    .withParams(params)
    .withCurrentToken()
    .fetchData()
}

// /get-saved-videos
export const getSavedVideos = (params: TGetSavedVideos["requestType"]) => {
  return Fetcher.init<TGetSavedVideos>("GET", profileEP.GET_SAVED_VIDEOS)
    .withParams(params)
    .withCurrentToken()
    .fetchData()
}

// /get-saved-videos
export const setNotificationToken = (
  data: TSetNotificationToken["requestType"],
) => {
  return Fetcher.init<TSetNotificationToken>(
    "PUT",
    profileEP.SET_NOTIFICATION_TOKEN,
  )
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}
