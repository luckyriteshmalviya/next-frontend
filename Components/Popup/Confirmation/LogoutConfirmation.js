import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setPopup } from "redux/actions/uiActions/action";
import { sendEmployeeDetails } from "services/user";

const LogoutConfirmation = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const onButtonClick = () => {
    let savedState = JSON.parse(localStorage.getItem("savedState"));

    dispatch(setPopup(null));
    // if (!savedState || savedState === 11) return;

    if (savedState && savedState > 3 && savedState != 11) sendEmployeeDetails();

    router.push("/");
  };

  const onNoClick = () => {
    dispatch(setPopup(null));
  };

  return (
    <div className="trial-confirmation-container">
      <h1 className="popup-confirm-title">Are you sure? </h1>
      <div className="bottom-section">
        <button className="btn-secondary" onClick={onButtonClick}>
          YES
        </button>
        <button className="btn-primary" onClick={onNoClick}>
          NO
        </button>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
