import { useState } from "react";

function Header({ state, changeHireState }) {
  return (
    <div className="header">
      <div className="header-main">
        <div>
          <img
            className="mopid-logo"
            src="/assets/images/mopidLogo.svg"
            alt="Mopid Logo"
          />
        </div>
        <div>
          <div className="header-button-area">
            <div
              onClick={() => changeHireState("Hire")}
              className={`${
                state == "Hire"
                  ? "header-button-selected"
                  : "header-button-unselected"
              }`}
            >
              Hire
            </div>
            <div
              onClick={() => changeHireState("GetHire")}
              className={`${
                state == "GetHire"
                  ? "header-button-selected"
                  : "header-button-unselected"
              }`}
            >
              Get Hired
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
