import React from "react";
import { reportQuestion } from "services/assessment";

const Step1 = ({ setStep, id, questionNo }) => {
  const onContinue = async () => {
    await reportQuestion(id, { loader: true });
    setStep(2);
  };

  return (
    <div className="step1-container">
      <div className="report-icon-wrapper">
        <img src="/assets/svgIcons/report-mopid.svg" />
      </div>
      <p className="report-heading">Report Issue - Q{questionNo ?? 0}</p>
      <p className="report-description">
        Are you sure you want to report this question for review?
      </p>
      <div className="button-wrapper">
        <button className="btn-primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Step1;
