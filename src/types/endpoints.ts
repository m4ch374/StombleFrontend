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
  phone: string,
  password: string,
  fullName: string,
  birthday: string,
  gender: string
}

export type TPreSignUp = TEndpoint<PreSignUpReq, void>
// ===================================================
