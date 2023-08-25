// Generic Type
export type TEndpoint<Req, Res> = {
  requestType: Req
  responseType: Res
}

// ###################################################
// # Your own types                                  #
// ###################################################

// ===================================================
// /sign-in
// ===================================================
type SignInReq = {
  phone: string
  password: string
}

type SignInRes = {
  AccessToken: string
  RefreshToken: string
}

export type TSignIn = TEndpoint<SignInReq, SignInRes>
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

export type TForgotPassword = TEndpoint<ForgotPasswordReq, void>
// ===================================================

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

export type TPreSignUp = TEndpoint<PreSignUpReq, void>
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

// /update-user-personal-info
// ===================================================
type UpdateUserInfoReq = {
  attribute: "email" | "phone_number" | "name"
  userId: string
  value: string
  code?: string
}

export type TUpdateUserInfo = TEndpoint<UpdateUserInfoReq, void>
// ===================================================

// /send-code-change-attribute
// ===================================================
type SendCodeChangeAttributeReq = {
  attribute: "email" | "phone_number"
  userId: string
  value: string
}

export type TSendCodeChangeAttribute = TEndpoint<
  SendCodeChangeAttributeReq,
  void
>
// ===================================================

// /update-icon
// ===================================================
type UpdateIconReq = {
  iconFile: object
  userId: string
  businessId?: string
}

export type TUpdateIcon = TEndpoint<UpdateIconReq, void>
// ===================================================

// /update-icon
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
