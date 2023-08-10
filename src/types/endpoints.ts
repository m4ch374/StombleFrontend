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
