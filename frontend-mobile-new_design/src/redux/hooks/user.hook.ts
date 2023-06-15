import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectPendingUser,
  selectToken,
} from "../reducers/user.reducer";

export const useUser = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);
  const pendingUser = useSelector(selectPendingUser);

  return useMemo(
    () => ({ user, token, pendingUser }),
    [user, token, pendingUser]
  );
};
