import { profileEP } from "constants/Endpoint"
import { TGetFollowings } from "types/endpoints"
import Fetcher from "utils/Fetcher"

// i leave here blank
// for some GET method, I feel maybe need to config params in Fetcher

// /get-followings
export const getFollowings = () => {
  return Fetcher.init<TGetFollowings>("GET", profileEP.GET_FOLLOWINGS)
    .withCurrentToken()
    .fetchData()
}
