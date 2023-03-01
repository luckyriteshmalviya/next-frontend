import { SETAUTHTOKEN, SETDEVICEINFO, LOGOUT } from "./actionType";

/**
 *
 * @param {*} token Authentication taken we get from Login/Signup api
 * @returns
 */
export const setAuthToken =
  (token, userType = null) =>
  async (dispatch) => {
    token = "Bearer " + token;
    dispatch({
      type: SETAUTHTOKEN,
      payload: {
        token,
        userType,
      },
    });

    await localStorage.setItem("auth-token", token);
    await localStorage.setItem("user-type", userType);
  };

/**
 * This function checks if token is present in localstorage or not, if present then it dispatches it to redux
 * @param {*} token Authentication taken we get from Login/Signup api
 * @returns
 */
export const getAuthToken = () => async (dispatch) => {
  let token = localStorage.getItem("auth-token");
  let userType = localStorage.getItem("user-type");

  token &&
    dispatch({
      type: SETAUTHTOKEN,
      payload: {
        token,
        userType,
      },
    });
};

/**
 * Data needed from firebase to support messaging
 * @param {*} deviceId
 * @param {*} deviceToken
 * @returns
 */
export const setDeviceInfo = (deviceId, deviceToken) => (dispatch) => {
  dispatch({
    type: SETDEVICEINFO,
    payload: {
      deviceId,
      deviceToken,
    },
  });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("auth-token");
  localStorage.removeItem("survey-data");
  localStorage.removeItem("daily-task");
  localStorage.removeItem("already-taken");
  localStorage.removeItem("assessment-skipped");

  dispatch({ type: LOGOUT });
};
