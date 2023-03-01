import { setAuthToken } from "redux/actions/authActions/actions";
export const handleAuthToken = (token) => async (dispatch) => {
  if (token) {
    dispatch(setAuthToken(token));
  }
};
