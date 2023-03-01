import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "redux/actions/uiActions/action";

/**
 *
 * @param {title} title to show in header
 * @param {subheading} text to show under title in
 * @param {innerPageMobile} This parameter decides if back button and title should be there in mobile or not,
 * If true bottom navigation is also remove from wrapper
 * @param {innerPageDesktop} This parameter decides if back button and title should be there in desktop or not
 * @param {onBack} route to redirect the user to when he clicks back button in header
 * @returns
 */
const NavBar = ({
  title,
  innerPageMobile = true,
  innerPageDesktop = true,
  onBack,
  onViewAll,
  isLogout,
  onButtonClick,
  confirmQuit
}) => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  /**
   * this executes the onBack method passed through props if present
   */
  const onBackClick = () => {
    confirmQuit()
  };

  const onLogout = () => {
    dispatch(setPopup(4));
  };

  return (
    <div
      className={`navbar-container
       ${innerPageDesktop ? "inner-desktop" : ""}
        ${innerPageMobile ? "inner-mobile" : ""} 
        ${onButtonClick ? "header-button" : ""}`}
    >
      <div className="navbarcontent-wrapper">
        <div className="title-wrapper">
          <img src="/assets/svgIcons/back.svg" onClick={onBackClick} />
          <div className="text-wrapper">
            <h1 className="nav-title">{title}</h1>
          </div>
        </div>
        {onViewAll && (
          <div className="viewall-wrapper" onClick={onViewAll}>
            <p>View All</p>
          </div>
        )}
        {isLogout && (
          <div className="logout-wrapper" onClick={onLogout}>
            <p>Log out</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
