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

// /sign-out
// ===================================================
type SignOutReq = {
  token: string
}

export type TSignOut = TEndpoint<SignOutReq, void>
// ===================================================

// /get-user-account-information
// ===================================================
type GetUserInfoReq = {
  token: string
}

type GetUserInfoRes = {
  // how should i deal with this 'result'
  result: {
    id: string // idk whether it's needed
    phone: string
    fullName: string
    email: string
    link_icon: string
    fcmToken: string // idk what this is and whether it's needed
    birthday: string
    gender: string
  }
}

export type TGetUserInfo = TEndpoint<GetUserInfoReq, GetUserInfoRes>
