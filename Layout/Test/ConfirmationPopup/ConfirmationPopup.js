import { useDispatch } from "react-redux";
import {
  clearAssessmentData,
  skipAssessment,
} from "redux/actions/assessmentActions/actions";
import Popup from "Components/Popup/Popup";

const ConfirmationPopup = ({
  show,
  togglePopup,
  onQuit,
  onSubmit,
  type,
  page,
}) => {
  const dispatch = useDispatch();

  const onYes = () => {
    if (type === "submit") {
      togglePopup();
      onSubmit();
    } else {
      dispatch(clearAssessmentData());
      dispatch(skipAssessment());
      onQuit();
    }
  };

  return (
    <Popup isOpen={show}>
      <div className="confirmation-container">
        <div className="title-wrapper">
          {type === "submit" ? (
            <h1>Do you want to submit the test ?</h1>
          ) : (
            <h1>Do you want to quit the test ?</h1>
          )}
        </div>
        <div className="button-container">
          <button className="btn-secondary cancel" onClick={togglePopup}>
            Cancel
          </button>
          <button className="btn-primary" onClick={onYes}>
            Yes
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default ConfirmationPopup;
