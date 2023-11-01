import { notificationsEP } from "constants/Endpoint"
import { TGetNotifications, TReadOneNotification } from "types/endpoints"
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

// /read-one-notification
export const readOneNotification = (
  data: TReadOneNotification["requestType"],
) => {
  return Fetcher.init<TReadOneNotification>(
    "PUT",
    notificationsEP.READ_ONE_NOTIFICATION,
  )
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}
