import {
  SETUSERINFO,
  SETANIMATE,
  SETLOGIN,
  SETLOGINERROR,
  CLEARUSERDATA,
} from "../actions/userActions/actionType";

const initalState = {
  userInfo: null,
  animate: null,
  login: false,
  loginError: false,
};

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case SETUSERINFO:
      return {
        ...state,
        userInfo: action.payload,
      };

    case SETANIMATE:
      return {
        ...state,
        animate: null,
      };
    case SETLOGIN:
      return {
        ...state,
        login: action.payload,
      };

    case SETLOGINERROR:
      return {
        ...state,
        loginError: action.payload,
      };

    case CLEARUSERDATA:
      return {
        ...state,
        userInfo: {},
      };

    default:
      return state;
  }
};

export default userReducer;
