const { SETPOPUPID } = require("redux/actions/uiActions/actionType");

const initalState = {
  popupId: null,
  popupData: {},
};
const uiReducer = (state = initalState, action) => {
  switch (action.type) {
    case SETPOPUPID:
      return {
        ...state,
        popupId: action.payload.id,
        popupData: action.payload,
      };
    default:
      return state;
  }
};
export default uiReducer;
