// Generic Type
export type TEndpoint<Req, Res> = {
  requestType: Req
  responseType: Res
}

// ###################################################
// # Shared types                                  #
// ###################################################
type UserAccountInformationItem = {
  id: string
  phone: string
  fullName: string
  email: string
  link_icon: string
  amount_following: number
  amount_codes_sent: number
  fcmToken: string
  birthday: string
  gender: string
  status: string
  created_at: string
  updated_at: string
}

type BusinessAccountInformationItem = {
  id: string
  businessName: string
  email: string
  link_icon: string
  user_id: string
  amount_following: number
  amount_followers: number
  amount_videos: number
  status: string
  created_at: string
  updated_at: string
}

type FollowingResItem = {
  id: string
  business_account_id: string
  user_account_id: string
  follow_business_account_id: string
  follow_user_account_id: string
  created_at: string
  updated_at: string
  business_account: BusinessAccountInformationItem
}

type VideosItem = {
  id: string
  description: string
  link_video: string
  link_cover: string
  user_id: string
  business_account_id: string
  amount_likes: number
  amount_saves: number
  status: string
  date_posting: string
  created_at: string
  updated_at: string
}

type VideosResItem = {
  id: string
  videos_id: string
  user_id: string
  business_account_id: string
  created_at: string
  updated_at: string
  videos: VideosItem
}

type VideoPlayItem = VideosItem & {
  business_account: BusinessAccountInformationItem
}

export type ReasonsOfCloseAccount = {
  id: string
  description: string
  created_at: string
  updated_at: string
}

// ###################################################
// # Auth                                            #
// ###################################################
// ===================================================
// /sign-in
// ===================================================
export type SignInReq = {
  phone: string
  password: string
}

export type SignInRes = {
  AccessToken: string
  RefreshToken: string
}

export type TSignIn = TEndpoint<SignInReq, SignInRes>
// ===================================================

// ===================================================
// /sign-out
// ===================================================
type SignOutReq = {
  token: string
}

type SignOutRes = {
  statusCode: number
  message: string
}

export type TSignOut = TEndpoint<SignOutReq, SignOutRes>
// ===================================================

// ===================================================
// /sign-up
// ===================================================
type SignUpReq = {
  phone: string
  password: string
  businessName: string
  isBusiness: boolean
}

export type TSignUp = TEndpoint<SignUpReq, SignInRes>
// ===================================================

// ===================================================
// /forgot-password
// ===================================================
type ForgotPasswordReq = {
  phone: string
}

type ForgotPasswordRes = {
  message: string
  statusCode: number
}

export type TForgotPassword = TEndpoint<ForgotPasswordReq, ForgotPasswordRes>
// ===================================================

// /change-password
// ===================================================
type ChangePasswordReq = {
  phone: string
  previousPassword: string
  proposedPassword: string
}

type ChangePasswordRes = {
  statusCode: number
  message: string
}

export type TChangePassword = TEndpoint<ChangePasswordReq, ChangePasswordRes>
// ===================================================

// /confirm-code && /confirm-pre-sign-up
// ===================================================
type ConfirmReq = {
  code: string
  phone: string
  password?: string
}

export type TConfirm = TEndpoint<ConfirmReq, void>
// ===================================================

// ===================================================
// /re-send-code
// ===================================================
type ResendCodeReq = {
  phone: string
}

type ResendCodeRes = {
  message: string
  statusCode: number
}

export type TResendCode = TEndpoint<ResendCodeReq, ResendCodeRes>
// ===================================================

// ===================================================
// /check-number
// ===================================================
type CheckNumReq = {
  phone: string
}

type CheckNumRes = {
  exists: boolean
  msg: string
}

export type TCheckNum = TEndpoint<CheckNumReq, CheckNumRes>
// ===================================================

// ===================================================
// /pre-sign-up
// ===================================================
type PreSignUpReq = {
  phone: string
  password: string
  fullName: string
  birthday: string
  gender: string
}

type PreSignUpRes = {
  message: string
  statusCode: number
}

export type TPreSignUp = TEndpoint<PreSignUpReq, PreSignUpRes>
// ===================================================

// ===================================================
// /pre-sign-up
// ===================================================
type RefreshTokenReq = {
  refreshToken: string
}

type RefreshTokenRes = {
  AccessToken: string
}

export type TRefreshToken = TEndpoint<RefreshTokenReq, RefreshTokenRes>
// ===================================================

// ###################################################
// # Profile                                        #
// ###################################################
// ===================================================
// /get-followings
// ===================================================
type GetFollowingsReq = {
  businessId?: string
  take: number
  skip?: number
}

type GetFollowingsRes = {
  result: FollowingResItem[]
}

export type TGetFollowings = TEndpoint<GetFollowingsReq, GetFollowingsRes>
// ===================================================

// ===================================================
// /get-liked-videos
// ===================================================

type GetLikedVideosReq = {
  businessId?: string
  take: number
  skip?: number
}

type GetLikedVideosRes = {
  result: VideosResItem[]
}

export type TGetLikedVideos = TEndpoint<GetLikedVideosReq, GetLikedVideosRes>
// ===================================================

// ===================================================
// /get-saved-videos
// ===================================================
type GetSavedVideosReq = {
  businessId?: string
  take: number
  skip?: number
}

type GetSavedVideosRes = {
  result: VideosResItem[]
}

export type TGetSavedVideos = TEndpoint<GetSavedVideosReq, GetSavedVideosRes>
// ===================================================

// ###################################################
// # Account Information                             #
// ###################################################
// ===================================================
// /get-user-account-information
// ===================================================
type GetUserAccountInformationRes = {
  result: UserAccountInformationItem
}

type SetNotificationTokenReq = {
  notificationToken: string
}

type SetNotificationTokenRes = {
  result: UserAccountInformationItem[]
}

export type TSetNotificationToken = TEndpoint<
  SetNotificationTokenReq,
  SetNotificationTokenRes
>

export type TGetUserInfo = TEndpoint<void, GetUserAccountInformationRes>
// ===================================================

// ===================================================
// /get-business-account-information
// ===================================================
type GetBusinessAccountInformationReq = {
  businessId: string
}

type GetBusinessAccountInformationRes = {
  result: BusinessAccountInformationItem
}

export type TGetBusinessInfo = TEndpoint<
  GetBusinessAccountInformationReq,
  GetBusinessAccountInformationRes
>
// ===================================================

// /update-user-personal-info
// ===================================================
type UpdatePersonalInfoReq = {
  attribute: "email" | "phone_number" | "name"
  value: string
  code?: string
}

type UpdatePersonalInfoRes = {
  message: string
  statusCode: number
}

export type TUpdatePersonalInfo = TEndpoint<
  UpdatePersonalInfoReq,
  UpdatePersonalInfoRes
>
// ===================================================

// /send-code-change-attribute
// ===================================================
type SendCodeChangeAttributeReq = {
  attribute: "email" | "phone_number"
  value: string
}

type SendCodeChangeAttributeRes = {
  message: string
  statusCode: number
}

export type TSendCodeChangeAttribute = TEndpoint<
  SendCodeChangeAttributeReq,
  SendCodeChangeAttributeRes
>
// ===================================================

// /update-icon
// ===================================================
type UpdateIconReq = {
  iconFile: {
    base64: string
    ext: string
    type: string
    name: string
    size: string
  }
  businessId?: string
}

type UpdateIconRes = {
  message: string
  statusCode: number
}

export type TUpdateIcon = TEndpoint<UpdateIconReq, UpdateIconRes>
// ===================================================

// /delete-icon
// ===================================================
type DeleteIconReq = {
  businessId?: string
}

type DeleteIconRes = {
  message: string
  statusCode: number
}

export type TDeleteIcon = TEndpoint<DeleteIconReq, DeleteIconRes>
// ===================================================

// ===================================================
// /close-account
// ===================================================
type CloseAccountReq = {
  businessId?: string
}

export type TCloseAccount = TEndpoint<CloseAccountReq, void>
// ===================================================

// ===================================================
// /get-reasons-to-close-account
// ===================================================
type GetReasonsToCloseAccountRes = {
  reasons: ReasonsOfCloseAccount[]
}

export type TGetReasonsToCloseAccount = TEndpoint<
  void,
  GetReasonsToCloseAccountRes
>
// ===================================================

// ###################################################
// # Searching                                      #
// ###################################################
// ===================================================
// /search-businesses-and-videos
// ===================================================
type GetSearchBusinessAndVideosReq = {
  query: string
  businessId?: string
  businessAccountSkip?: number
  businessAccountTake?: number
  videoSkip?: number
  videoTake?: number
}

export type BusinessAccountsWithFollowStatusRes =
  BusinessAccountInformationItem & {
    business_account_id_to_business_account_id: {
      business_account_id: string
    }[]
  }

export type VideosWithBusinessAndLikedStatus = VideosItem & {
  business_account: {
    businessName: string
    link_icon: string
    amount_followers: string
  }
  videos_liked: {
    videos_id: string
  }[]
}

type SearchBusinessAndVideosRes = {
  result: {
    businessAccountsWithFollowStatus: BusinessAccountsWithFollowStatusRes[]
    videosWithBusinessAndLikedStatus: VideosWithBusinessAndLikedStatus[]
  }
}

export type TSearchBusinessAndVideos = TEndpoint<
  GetSearchBusinessAndVideosReq,
  SearchBusinessAndVideosRes
>

type LikeVideoReq = {
  videoId: string
  businessId?: string
}

type LikeVideoRes = {
  message: string
  statusCode: number
}

export type TLikeVideo = TEndpoint<LikeVideoReq, LikeVideoRes>

// ###################################################
// # Settings                                        #
// ###################################################
// ===================================================
// /become-business-account
// ===================================================
type BecomeBusinessAccountReq = {
  businessName: string
}

type BecomeBusinessAccountRes = {
  result: BusinessAccountInformationItem
}

export type TBecomeBusinessAccount = TEndpoint<
  BecomeBusinessAccountReq,
  BecomeBusinessAccountRes
>
// ===================================================

// ###################################################
// # Manage Profiles                                 #
// ###################################################
// ===================================================
// /get-business-account-related-profiles
// ===================================================
type GetBusinessAccountRelatedProfilesRes = {
  result: BusinessAccountInformationItem[]
}

export type TGetBusinessAccountRelatedProfiles = TEndpoint<
  void,
  GetBusinessAccountRelatedProfilesRes
>

// ###################################################
// # Video Play                                      #
// ###################################################
// ===================================================
// /get-videos-for-video-play
// ===================================================
type GetVideosForVideoPlayReq = {
  businessId?: string
  take: number
  skip?: number
}

type GetVideosForVideoPlayRes = {
  result: VideoPlayItem[]
}

export type TGetVideosForVideoPlay = TEndpoint<
  GetVideosForVideoPlayReq,
  GetVideosForVideoPlayRes
>
// ===================================================

// ===================================================
// /unlike-video
// ===================================================
type UnlikeVideoReq = {
  videoId: string
  businessId?: string
}

type UnlikeVideoRes = {
  message: string
  statusCode: number
}

export type TUnlikeVideo = TEndpoint<UnlikeVideoReq, UnlikeVideoRes>
// ===================================================

// ===================================================
// /report-video
// ===================================================
type ReportVideoReq = {
  reportId: string
  videoId: string
  businessId?: string
  description: string
}

type ReportVideoRes = {
  message: string
  statusCode: number
}

export type TReportVideo = TEndpoint<ReportVideoReq, ReportVideoRes>

type FollowBusinessRes = {
  message: string
  statusCode: number
}

type FollowBusinessReq = {
  businessToFollowing: string
  businessId?: string
}

export type TFollowBusiness = TEndpoint<FollowBusinessReq, FollowBusinessRes>

// ===================================================
// /unfollow-business
// ===================================================
type UnFollowBusinessReq = {
  businessId?: string
  businessToFollowing: string
}

type UnFollowBusinessRes = {
  message: string
  statusCode: number
}

export type TUnFollowBusiness = TEndpoint<
  UnFollowBusinessReq,
  UnFollowBusinessRes
>

// ===================================================
// /save-record-of-video-shared
// ===================================================
type SaveRecordOfVideoSharedReq = {
  videoId: string
  platform: string
  otherPlatform: string
  businessId?: string
}

type SaveRecordOfVideoSharedRes = {
  message: string
  statusCode: number
}

export type TSaveRecordOfVideoShared = TEndpoint<
  SaveRecordOfVideoSharedReq,
  SaveRecordOfVideoSharedRes
>
// ===================================================

// ===================================================
// /save-video
// ===================================================
type SaveVideoReq = {
  videoId: string
  businessId?: string
}

type SaveVideoRes = {
  message: string
  statusCode: number
}

export type TSaveVideo = TEndpoint<SaveVideoReq, SaveVideoRes>
// ===================================================

// ===================================================
// /un-save-video
// ===================================================
type UnSaveVideoReq = {
  videoId: string
  businessId?: string
}

type UnSaveVideoRes = {
  message: string
  statusCode: number
}

export type TUnSaveVideo = TEndpoint<UnSaveVideoReq, UnSaveVideoRes>
// ===================================================

// ===================================================
// /get-videos-new-business
// ===================================================
type GetVideosNewBusinessReq = {
  amountVideos: number
}

type GetVideosNewBusinessRes = {
  result: VideoPlayItem[]
}

export type TGetVideosNewBusiness = TEndpoint<
  GetVideosNewBusinessReq,
  GetVideosNewBusinessRes
>
// ===================================================

// ===================================================
// /get-new-videos-uploaded
// ===================================================
type GetNewVideosUploadedReq = {
  businessId?: string
  take: string
  skip?: string
}

type GetNewVideosUploadedRes = {
  result: {
    id: string
    business_account: BusinessAccountInformationItem
    videos: VideoPlayItem[]
  }[]
}

export type TGetNewVideosUploaded = TEndpoint<
  GetNewVideosUploadedReq,
  GetNewVideosUploadedRes
>
// ===================================================

// ###################################################
// # Notifications                                   #
// ###################################################
// ===================================================
// /get-notifications
// ===================================================
type GetNotificationsReq = {
  take: string
  skip: string
}
type GetNotificationsRes = {
  result: NotificationsItem[]
}

export type NotificationsItem = {
  id: string
  title: string
  msg: string
  isRead: boolean
  business_id: string
  user_id: string
  redirect_url: string
  created_at: string
  updated_at: string
}

export type TGetNotifications = TEndpoint<
  GetNotificationsReq,
  GetNotificationsRes
>

// ###################################################
// # Data Visualization                              #
// ###################################################

// ===================================================
// .................. adding more ....................
// ===================================================
