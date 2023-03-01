import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWindowHeight from "customhooks/useWindowHeight";
import LogoutConfirmation from "./Confirmation/LogoutConfirmation";
import { setPopup } from "redux/actions/uiActions/action";

const Popup = ({
  isOpen = false,
  id,
  onPopupClose,
  children,
  type = "bottom",
  ...props
}) => {
  const container = useRef(null);
  useWindowHeight(container);

  const popupData = useSelector((store) => store.ui?.popupData);
  const dispatch = useDispatch();

  const onClosePopup = () => {
    dispatch(setPopup(null));
  };

  const renderPopup = (id, props) => {
    switch (id) {
      case 1:
        return <LogoutConfirmation isOpen={isOpen} {...props} />;

      default:
        return null;
    }
  };

  return (
    <div className={`popup-container ${!isOpen ? "hide" : ""}`} ref={container}>
      <div className={`popup ${type}`}>
        {onPopupClose && (
          <img
            className="close"
            src="/assets/svgIcons/close.svg"
            onClick={onPopupClose}
          />
        )}
        {children}
        {renderPopup(id, props)}
      </div>
    </div>
  );
};

export default Popup;
