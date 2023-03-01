import {
  SETUSERINFO,
  SETLOGIN,
  SETLOGINERROR,
  CLEARUSERDATA,
} from "./actionType";

export const setUserData = (data) => async (dispatch) => {
  dispatch({
    type: SETUSERINFO,
    payload: data,
  });
};

export const setLogin = (data) => async (dispatch) => {
  dispatch({
    type: SETLOGIN,
    payload: data,
  });
};

export const setLoginError = (data) => async (dispatch) => {
  dispatch({
    type: SETLOGINERROR,
    payload: data,
  });
};

export const clearUserData = (dispatch) => {
  dispatch({
    type: CLEARUSERDATA,
  });
};
