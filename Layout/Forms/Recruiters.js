import { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";

import Designation from "../../Components/FormComponent/Recruiters/Designation";
import CompanyName from "../../Components/FormComponent/Recruiters/CompanyName";
import TeamSize from "../../Components/FormComponent/Recruiters/TeamSize";
import Domain from "../../Components/FormComponent/Recruiters/Domain";
import MessageFromRecuiter from "../../Components/FormComponent/Recruiters/MessageFromRecruiter";
import RecruiterName from "Components/FormComponent/Recruiters/RecruiterName";
import RecruiterEmail from "Components/FormComponent/Recruiters/RecruiterEmail";
import FormLastPage from "Components/FormComponent/Recruiters/FormLastPage";
import { setPopup } from "redux/actions/uiActions/action";
import { useDispatch } from "react-redux";

const Recruiter = () => {
  const router = useRouter();
  const nameRef = useRef(null);
  const animRef = useRef(null);
  const dispatch = useDispatch();
  let ref;
  const [state, setState] = useState(1);

  useEffect(() => {
    ref = nameRef;
    let currentStep = ref?.current ?? {};

    if (animRef?.current) {
      animRef.current.className = "hide";
      setTimeout(() => {
        if (animRef?.current) animRef.current.className = "fadeout";
      }, 200);
    }
  }, [state]);

  const getButtonType = () => {
    let buttonType = "Next";
    if (state === 7) {
      buttonType = "Submit";
      return buttonType;
    }

    return buttonType;
  };

  const onPrev = () => {
    if (state <= 1 || state === 8) {
      router.push("/");
    } else setState((prev) => prev - 1);
  };

  const goToHome = () => {
    dispatch(setPopup(1));
  };

  const onNext = async () => {
    if (state >= 8) {
      router.push("/");
      return;
    }
    let ref = nameRef;

    let currentStep = ref?.current ?? {};
    await currentStep?.validateForm();
    currentStep = ref?.current ?? {};

    if (Object.keys(currentStep.errors).length != 0) return;

    if (state === 7) {
      await currentStep.handleSubmit();
    }

    setState((next) => next + 1);
  };

  const renderComponent = (state) => {
    switch (state) {
      case 1:
        return <RecruiterName ref={nameRef} />;

      case 2:
        return <RecruiterEmail ref={nameRef} />;

      case 3:
        return <Designation ref={nameRef} />;

      case 4:
        return <CompanyName ref={nameRef} />;

      case 5:
        return <TeamSize ref={nameRef} />;

      case 6:
        return <Domain ref={nameRef} />;

      case 7:
        return <MessageFromRecuiter ref={nameRef} />;

      case 8:
        return <FormLastPage ref={nameRef} />;

      default:
        return null;
    }
  };

  return (
    <div className="onboarding">
      <div ref={animRef}>
        <div>
          <img className="form-logo" src="/assets/images/mopidLogoForm.svg" />
        </div>
        <div onClick={goToHome}>
          <img
            className="form-cross-button"
            src="/assets/images/Group 26920.svg"
          />
        </div>
        <div className="component-wrapper">
          <div>{renderComponent(state)}</div>

          <div className="button-component">
            <div className="prev button" onClick={onPrev}>
              Back
            </div>
            <div className="next button" onClick={onNext}>
              {getButtonType()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Recruiter;
