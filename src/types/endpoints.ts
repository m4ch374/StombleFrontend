// Generic Type
export type TEndpoint<Req, Res> = {
  requestType: Req,
  responseType: Res
}

// ###################################################
// # Your own types                                  #
// ###################################################

// ===================================================
// /confirm-code && /confirm-pre-sign-up
// ===================================================
type ConfirmReq = {
  code: string,
  phone: string,
  password?: string,
}

export type TConfirm = TEndpoint<ConfirmReq, void>
// ===================================================

// ===================================================
// /check-number
// ===================================================
type CheckNumReq = {
  phone: string,
}

type CheckNumRes = {
  exists: boolean,
  msg: string,
}

export type TCheckNum = TEndpoint<CheckNumReq, CheckNumRes>
// ===================================================
