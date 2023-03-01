import React, { useState } from "react";
import Popup from "Components/Popup/Popup";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";

const ReportPopup = ({ isOpen, onClose, question, questionNo }) => {
  const [step, setStep] = useState(1);

  const onPopupClose = () => {
    onClose();
    setStep(1);
  };

  return (
    <Popup isOpen={isOpen} type={"center"} onPopupClose={onPopupClose}>
      <div className="report-popup-container">
        {step == 1 && (
          <Step1 setStep={setStep} id={question?.id} questionNo={questionNo} />
        )}
        {step == 2 && <Step2 onContinue={onPopupClose} />}
      </div>
    </Popup>
  );
};

export default ReportPopup;
