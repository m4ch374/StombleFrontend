import { settingEP } from "constants/Endpoint"
import { TBecomeBusinessAccount } from "types/endpoints"
import Fetcher from "utils/Fetcher"

// /become-business-account
export const becomeBusinessAccount = (
  data: TBecomeBusinessAccount["requestType"],
) => {
  return Fetcher.init<TBecomeBusinessAccount>(
    "POST",
    settingEP.BECOME_BUSINESS_ACCOUNT,
  )
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}
