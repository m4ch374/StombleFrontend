import { authEP } from "constants/Endpoint"
import {
  TChangePassword,
  TCheckNum,
  TConfirm,
  TForgotPassword,
  TPreSignUp,
  TRefreshToken,
  TResendCode,
  TSignIn,
  TSignOut,
  TSignUp,
} from "types/endpoints"
import Fetcher from "utils/Fetcher"

// /check-number
export const checkNumber = (data: TCheckNum["requestType"]) => {
  return Fetcher.init<TCheckNum>("POST", authEP.CHECK_NUMBER)
    .withJsonPaylad(data)
    .fetchData()
}

// /pre-sign-up
export const preSignUp = (data: TPreSignUp["requestType"]) => {
  return Fetcher.init<TPreSignUp>("POST", authEP.PRE_SIGN_UP)
    .withJsonPaylad(data)
    .fetchData()
}

// /confirm-pre-sign-up
export const confirmPreSignUp = (data: TConfirm["requestType"]) => {
  return Fetcher.init<TConfirm>("POST", authEP.CONFIRM_PRE_SIGN_UP)
    .withJsonPaylad(data)
    .fetchData()
}

// /confirm-code
export const confirmCode = (data: TConfirm["requestType"]) => {
  return Fetcher.init<TConfirm>("POST", authEP.CONFIRM_CODE)
    .withJsonPaylad(data)
    .fetchData()
}

// /sign-up
export const signUp = (data: TSignUp["requestType"]) => {
  return Fetcher.init<TSignUp>("POST", authEP.SIGN_UP)
    .withJsonPaylad(data)
    .fetchData()
}

// /sign-in
export const signIn = (data: TSignIn["requestType"]) => {
  return Fetcher.init<TSignIn>("POST", authEP.SIGN_IN)
    .withJsonPaylad(data)
    .fetchData()
}

// /forgot-password
export const forgotPassword = (data: TForgotPassword["requestType"]) => {
  return Fetcher.init<TForgotPassword>("POST", authEP.FORGOT_PASSWORD)
    .withJsonPaylad(data)
    .fetchData()
}

// /change-password
export const changePassword = (data: TChangePassword["requestType"]) => {
  return Fetcher.init<TChangePassword>("POST", authEP.CHANGE_PASSWORD)
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}

// /re-send-code
export const resendCode = (data: TResendCode["requestType"]) => {
  return Fetcher.init<TResendCode>("PUT", authEP.RE_SEND_CODE)
    .withJsonPaylad(data)
    .fetchData()
}

// /sigin-out
export const signOut = (data: TSignOut["requestType"]) => {
  return Fetcher.init<TSignOut>("POST", authEP.SIGN_OUT)
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}

// /refresh-token
export const refreshToken = (data: TRefreshToken["requestType"]) => {
  return Fetcher.init<TRefreshToken>("PUT", authEP.REFRESH_TOKEN)
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}
