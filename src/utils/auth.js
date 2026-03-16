import { setAccessToken } from "../services/api";
import { setUser } from "../store/slices/authSlice";

export function handleLoginSuccess(dispatch, token, role) {
  setAccessToken(token);
  dispatch(setUser({ token, role }));
}
