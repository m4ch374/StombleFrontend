import { searchingEP } from "constants/Endpoint"
import { TSearchBusinessAndVideos } from "types/endpoints"
import Fetcher from "utils/Fetcher"

// /search-businesses-and-videos
export const searchBusinessesAndVideos = (
  params: TSearchBusinessAndVideos["requestType"],
) => {
  return Fetcher.init<TSearchBusinessAndVideos>(
    "GET",
    searchingEP.SEARCH_BUSINESSES_AND_VIDEOS,
  )
    .withParams(params)
    .withCurrentToken()
    .fetchData()
}
