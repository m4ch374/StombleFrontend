import { notificationsEP } from "constants/Endpoint"
import { TGetNotifications } from "types/endpoints"
import Fetcher from "utils/Fetcher"

// /get-notifications
export const getNotifications = ({
  take,
  skip,
}: TGetNotifications["requestType"]) => {
  return Fetcher.init<TGetNotifications>(
    "GET",
    notificationsEP.GET_NOTIFICATIONS,
  )
    .withCurrentToken()
    .withParams({ take, skip })
    .fetchData()
}
