import { manageProfilesEP } from "constants/Endpoint"
import { TGetBusinessAccountRelatedProfiles } from "types/endpoints"
import Fetcher from "utils/Fetcher"

// /get-business-account-related-profiles
export const getBusinessAccountRelatedProfiles = () => {
  return Fetcher.init<TGetBusinessAccountRelatedProfiles>(
    "GET",
    manageProfilesEP.GET_BUSINESS_ACCOUNT_RELATED_PROFILES,
  )
    .withCurrentToken()
    .fetchData()
}
