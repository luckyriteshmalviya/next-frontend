import {
  SETAUTHTOKEN,
  SETDEVICEINFO,
  LOGOUT,
} from "../actions/authActions/actionType";

const initialState = {
  token: null,
  userType: null,
  deviceId: null,
  deviceToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETAUTHTOKEN:
      return {
        ...state,
        token: action.payload?.token,
        userType: action.payload?.userType,
      };

    case SETDEVICEINFO:
      return {
        ...state,
        ...action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        token: null,
      };

    default:
      return state;
  }
};

export default authReducer;
