// Generic Type
export type TEndpoint<Req, Res> = {
  requestType: Req
  responseType: Res
}

// ###################################################
// # Your own types                                  #
// ###################################################

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
  statusCode: string
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
// /close-account
// ===================================================
type CloseAccountReq = {
  businessId?: string
}

export type TCloseAccount = TEndpoint<CloseAccountReq, void>
// ===================================================

// ###################################################
// # Profile                                        #
// ###################################################
// ===================================================
// /get-followings
// ===================================================
type GetFollowingsReq = {
  businessId: string
  take: string
  skip: string
}

type FollowingResItem = {
  id: string
  business_account_id: string
  user_account_id: string
  follow_business_account_id: string
  follow_user_account_id: string
  created_at: string
  updated_at: string
  business_account: {
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
}

type GetFollowingsRes = {
  result: FollowingResItem[]
}

export type TGetFollowings = TEndpoint<GetFollowingsReq, GetFollowingsRes>
// ===================================================

// ###################################################
// # Account Information                             #
// ###################################################
// ===================================================
// /get-user-account-information
// ===================================================
type GetUserInfoReq = {
  token: string
}

type GetUserInfoRes = {
  result: {
    id: string
    phone: string
    fullName: string
    email: string
    link_icon: string
    fcmToken: string
    birthday: string
    gender: string
  }
}

export type TGetUserInfo = TEndpoint<GetUserInfoReq, GetUserInfoRes>
// ===================================================

// ===================================================
// /get-business-account-information
// ===================================================
type GetBusinessInfoReq = {
  businessId: string
}

type GetBusinessInfoRes = {
  result: {
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
}

export type TGetBusinessInfo = TEndpoint<GetBusinessInfoReq, GetBusinessInfoRes>
// ===================================================

// /update-user-personal-info
// ===================================================
type UpdatePersonalInfoReq = {
  attribute: "email" | "phone_number" | "name"
  userId: string
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
  userId: string
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
  userId: string
  businessId?: string
}

type UpdateIconRes = {
  message: string
  statusCode: number
}

export type TUpdateIcon = TEndpoint<UpdateIconReq, UpdateIconRes>
// ===================================================

type GetSearchBusinessAndVideosReq = {
  query: string
  businessId: string
  businessAccountSkip: string
  businessAccountTake: string
  videoSkip: string
  videoTake: string
}

export type BusinessAccountsWithFollowStatusRes = {
  id: string
  businessName: string
  email: string
  link_icon: string
  user_id: string
  amount_following: number
  amount_followers: number
  amount_videos: number
  status: string
  created_at: Date
  updated_at: Date
  business_account_id_to_business_account_id: {
    business_account_id: string
  }[]
}

export type VideosWithBusinessAndLikedStatus = {
  id: string
  description: string
  link_video: string
  link_cover: string
  user_id: string
  business_account_id: string
  amount_likes: number
  amount_saves: number
  status: string
  date_posting: Date
  created_at: Date
  updated_at: Date
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
