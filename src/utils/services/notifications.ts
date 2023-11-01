import { notificationsEP } from "constants/Endpoint"
import {
  TDeleteOneNotification,
  TGetNotifications,
  TReadAllNotifications,
  TReadOneNotification,
} from "types/endpoints"
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

// /read-all-notifications
export const readAllNotifications = () => {
  return Fetcher.init<TReadAllNotifications>(
    "PUT",
    notificationsEP.READ_ALL_NOTIFICATIONS,
  )
    .withCurrentToken()
    .fetchData()
}

// /delete-one-notification
export const deleteOneNotification = (
  data: TDeleteOneNotification["requestType"],
) => {
  return Fetcher.init<TDeleteOneNotification>(
    "DELETE",
    notificationsEP.DELETE_ONE_NOTIFICATION,
  )
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}
