import { SETPOPUPID } from "./actionType";

export const setPopup =
  (id, data = {}) =>
  (dispatch) => {
    dispatch({
      type: SETPOPUPID,
      payload: { id, ...data },
    });
  };
