import React from "react";
import Popup from "Components/Popup/Popup";

const ResultCard = ({ show, onContinue }) => {
  const onContinueClick = () => {
    onContinue();
  };

  return (
    <Popup isOpen={show}>
      <div className="resultcard-container_result">
        <div className="card-title_result">Test complete!</div>
        <div className="svg-cotainer-result">
          <img
            src="/assets/svgIcons/bullseye.svg"
            alt="svg_icon"
            className="svg-result-icon"
            width={"171px"}
            heigh={"171px"}
          />
        </div>
        <div className="result-decription-container">
          <div className="result-description-first">
            Congratulations, you have completed the test.
          </div>
          <div className="result-description-second">
            Stay tuned, we’ll get in touch with you soon!
          </div>
        </div>

        <div className="mobile-buttons">
          <button className="btn-primary" onClick={onContinueClick}>
            Continue
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default ResultCard;
