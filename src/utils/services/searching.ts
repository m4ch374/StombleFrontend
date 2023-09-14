import { TSearchBusinessAndVideos } from "types/endpoints"
import Fetcher from "utils/Fetcher"

// /search-businesses-and-videos
export const searchBusinessesAndVideos = (url: string) => {
  return Fetcher.init<TSearchBusinessAndVideos>("GET", url)
    .withCurrentToken()
    .fetchData()
}
