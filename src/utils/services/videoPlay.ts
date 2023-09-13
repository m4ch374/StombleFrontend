import { videoPlayEP } from "constants/Endpoint"
import {
  TFollowBusiness,
  TGetNewVideosUploaded,
  TGetVideosForVideoPlay,
  TGetVideosNewBusiness,
  TLikeVideo,
  TReportVideo,
  TSaveRecordOfVideoShared,
  TSaveVideo,
  TUnFollowBusiness,
  TUnlikeVideo,
  TUnSaveVideo,
} from "types/endpoints"
import Fetcher from "utils/Fetcher"

// /get-videos-for-video-play
export const getVideosForVideoPlay = (
  params: TGetVideosForVideoPlay["requestType"],
) => {
  return Fetcher.init<TGetVideosForVideoPlay>(
    "GET",
    videoPlayEP.GET_VIDEOS_FOR_VIDEO_PLAY,
  )
    .withParams(params)
    .withCurrentToken()
    .fetchData()
}

// /unlike-video
export const unlikeVideo = (data: TUnlikeVideo["requestType"]) => {
  return Fetcher.init<TUnlikeVideo>("POST", videoPlayEP.UNLIKE_VIDEO)
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}

// /report-video
export const reportVideo = (data: TReportVideo["requestType"]) => {
  return Fetcher.init<TReportVideo>("POST", videoPlayEP.REPORT_VIDEO)
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}

// /follow-business
// NOTICE:
// businessId - it is the businessId if you are a business account
// businessToFollowing - it is a businessId which you want to follow
export const followBusiness = (data: TFollowBusiness["requestType"]) => {
  return Fetcher.init<TFollowBusiness>("POST", videoPlayEP.FOLLOW_BUSINESS)
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}

// /unfollow-business
// NOTICE:
// businessId - it is the businessId if you are a business account
// businessToFollowing - it is a businessId which you want to follow
export const unfollowBusiness = (data: TUnFollowBusiness["requestType"]) => {
  return Fetcher.init<TUnFollowBusiness>("POST", videoPlayEP.UNFOLLOW_BUSINESS)
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}

// /like-video
export const likeVideo = (data: TLikeVideo["requestType"]) => {
  return Fetcher.init<TLikeVideo>("POST", videoPlayEP.LIKE_VIDEO)
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}

// /save-record-of-video-shared
export const saveRecordOfVideoShared = (
  data: TSaveRecordOfVideoShared["requestType"],
) => {
  return Fetcher.init<TSaveRecordOfVideoShared>(
    "POST",
    videoPlayEP.SAVE_RECORD_OF_VIDEO_SHARED,
  )
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}

// /save-video
export const saveVideo = (data: TSaveVideo["requestType"]) => {
  return Fetcher.init<TSaveVideo>("POST", videoPlayEP.SAVE_VIDEO)
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}

// /un-save-video
export const unSaveVideo = (data: TUnSaveVideo["requestType"]) => {
  return Fetcher.init<TUnSaveVideo>("DELETE", videoPlayEP.UN_SAVE_VIDEO)
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}

// /get-videos-new-business
export const getVideosNewBusiness = (
  params: TGetVideosNewBusiness["requestType"],
) => {
  return Fetcher.init<TGetVideosNewBusiness>(
    "GET",
    videoPlayEP.GET_VIDEOS_NEW_BUSINESS,
  )
    .withParams(params)
    .withCurrentToken()
    .fetchData()
}

// /get-new-videos-uploaded
export const getNewVideosUploaded = (
  params: TGetNewVideosUploaded["requestType"],
) => {
  return Fetcher.init<TGetNewVideosUploaded>(
    "GET",
    videoPlayEP.GET_NEW_VIDEOS_UPLOADED,
  )
    .withParams(params)
    .withCurrentToken()
    .fetchData()
}
