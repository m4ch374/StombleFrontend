import { accountEP } from "constants/Endpoint"
import {
  TCloseAccount,
  TDeleteIcon,
  TGetUserInfo,
  TSendCodeChangeAttribute,
  TUpdateIcon,
  TUpdatePersonalInfo,
} from "types/endpoints"
import Fetcher from "utils/Fetcher"

// /get-user-account-information
export const getUserAccountInformation = () => {
  return Fetcher.init<TGetUserInfo>(
    "GET",
    accountEP.GET_USER_ACCOUNT_INFORMATION,
  )
    .withCurrentToken()
    .fetchData()
}

// /get-business-account-information
export const getBusinessAccountInformation = () => {
  return Fetcher.init<TGetUserInfo>(
    "GET",
    accountEP.GET_BUSINESS_ACCOUNT_INFORMATION,
  )
    .withCurrentToken()
    .fetchData()
}

// /update-icon
export const updateIcon = (data: TUpdateIcon["requestType"]) => {
  return Fetcher.init<TUpdateIcon>("POST", accountEP.UPDATE_ICON)
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}

// /delete-icon
export const deleteIcon = (data: TDeleteIcon["requestType"]) => {
  return Fetcher.init<TDeleteIcon>("DELETE", accountEP.DELETE_ICON)
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}

// /update-personal-info
export const updatePersonalInfo = (
  data: TUpdatePersonalInfo["requestType"],
) => {
  return Fetcher.init<TUpdatePersonalInfo>(
    "PUT",
    accountEP.UPDATE_PERSONAL_INFO,
  )
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}

// /send-code-change-attribute
export const sendCodeChangeAttribute = (
  data: TSendCodeChangeAttribute["requestType"],
) => {
  return Fetcher.init<TSendCodeChangeAttribute>(
    "POST",
    accountEP.SEND_CODE_CHANGE_ATTRIBUTE,
  )
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}

// /close-account
export const closeAccount = (data: TCloseAccount["requestType"]) => {
  return Fetcher.init<TCloseAccount>("DELETE", accountEP.CLOSE_ACCOUNT)
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}
