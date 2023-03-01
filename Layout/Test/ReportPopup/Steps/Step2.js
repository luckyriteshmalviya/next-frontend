import React from "react";

const Step2 = ({ onContinue }) => {
  return (
    <div className="step2-container">
      <div className="report-icon-wrapper">
        <img src="assets/images/ordersuccess.svg" />
      </div>
      <p className="report-heading">Issue Submitted</p>
      <p className="report-description">
        Thank you for reporting the issue. Our experts will look into it.
      </p>
      <div className="button-wrapper">
        <button className="btn-primary" onClick={onContinue}>
          Continue test
        </button>
      </div>
    </div>
  );
};

export default Step2;
