// Generic Type
export type TEndpoint<Req, Res> = {
  requestType: Req,
  responseType: Res
}

// ===================================================
// Your own types
type CheckNumReq = {
  phone: string,
}

type CheckNumRes = {
  exists: boolean,
  msg: string,
}

export type TCheckNum = TEndpoint<CheckNumReq, CheckNumRes>
