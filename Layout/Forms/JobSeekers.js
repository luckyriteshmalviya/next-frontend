import { useState, useEffect, useRef } from "react";
import EmailInput from "../../Components/FormComponent/JobSeekers/EmailInput/EmailInput";
import NameInput from "../../Components/FormComponent/JobSeekers/NameInput/NameInput";
import PhoneNumberInput from "../../Components/FormComponent/JobSeekers/PhoneNumberInput/PhoneNumberInput";
import ResumeInput from "../../Components/FormComponent/JobSeekers/ResumeInput/ResumeInput";
import { useRouter } from "next/router";
import DomainAndRole from "../../Components/FormComponent/JobSeekers/DomainAndRole/DomainAndRole";
import Experience from "../../Components/FormComponent/JobSeekers/Experience/Experience";
import FormLastPage from "../../Components/FormComponent/JobSeekers/FormLastPage/FormLastPage";
import JobType from "../../Components/FormComponent/JobSeekers/JobType/JobType";
import Availability from "../../Components/FormComponent/JobSeekers/Availability/Availability";
import MOdeOfAvailability from "../../Components/FormComponent/JobSeekers/ModeOfAvailability/ModeOfAvailability";
import CurrentStatus from "../../Components/FormComponent/JobSeekers/CurrentStatus/CurrentStatus";

import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "redux/actions/userActions/action";
import { setPopup } from "redux/actions/uiActions/action";

const JobSeekers = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const animRef = useRef(null);
  const isLogin = useSelector((store) => store.user.login);
  const user = useSelector((store) => store.user.userInfo);
  const token = useSelector((store) => store.auth.token);
  const isAssessment = useSelector(
    (store) => store?.user?.userInfo?.isAssessment
  );

  const [state, setState] = useState(1);
  const [progress, setProgress] = useState(false);
  let ref;

  const getButtonType = () => {
    let buttonType = "Next";

    if (state == 3 && isLogin === true) {
      buttonType = "Login";
      return buttonType;
    }
    if (state === 10) {
      buttonType = "Submit";
      return buttonType;
    }

    return buttonType;
  };

  useEffect(() => {
    ref = nameRef;
    setProgress(false);
    let currentStep = ref?.current ?? {};

    if (animRef?.current) {
      animRef.current.className = "hide";
      setTimeout(() => {
        if (animRef?.current) animRef.current.className = "fadeout";
      }, 200);
    }

    if (isAssessment) {
      setState(11);
    }

    if (user?.experience && user?.resume && token) {
      setState(11);
    }

    if (state > 3 && !token) {
      router.push("/");
    }
  }, [state]);

  useEffect(() => {
    let savedState = JSON.parse(localStorage.getItem("savedState"));
    if (savedState) {
      setState(savedState);
    }
  }, []);

  const onPrev = () => {
    if (state <= 1) {
      router.push("/");
      return;
    }

    if (state <= 3 && isLogin) {
      router.push("/");
      return;
    }

    setState((prev) => prev - 1);
  };

  const goToHome = () => {
    dispatch(setPopup(1));
    dispatch(setLogin(false));
    // router.push("/");
  };

  const onNext = async () => {
    event.preventDefault();
    if (state >= 11) {
      router.push("/");
      return;
    }

    let ref = nameRef;

    let currentStep = ref?.current ?? {};
    let currentValue = ref?.current?.values;

    await currentStep?.validateForm();

    currentStep = ref?.current ?? {};
    currentValue = ref?.current?.values;

    if (Object.keys(currentStep.errors).length != 0) return;

    if (state === 3 || state === 10 || state === 4) {
      let validity = await currentStep.submitForm();

      if (!validity) return;

      setTimeout(() => {
        setState((next) => next + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        setProgress(true);
      }, 400);
      setTimeout(() => {
        setState((next) => next + 1);
      }, 1000);
    }
    localStorage.setItem("savedState", state);
  };

  const renderComponent = (state) => {
    switch (state) {
      case 1:
        return <NameInput ref={nameRef} />;

      case 2:
        return <EmailInput ref={nameRef} />;

      case 3:
        return <PhoneNumberInput ref={nameRef} />;

      case 4:
        return <ResumeInput ref={nameRef} />;

      case 5:
        return <DomainAndRole ref={nameRef} />;

      case 6:
        return <JobType ref={nameRef} />;

      case 7:
        return <Availability ref={nameRef} />;

      case 8:
        return <MOdeOfAvailability ref={nameRef} />;

      case 9:
        return <CurrentStatus ref={nameRef} />;

      case 10:
        return <Experience ref={nameRef} />;

      case 11:
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

          {progress && (
            <div className="progress-saved-button">
              <div className="progress-saved">
                <div>
                  <img src="/assets/svgIcons/progress-info.svg" />
                </div>
                <div>Progress Saved</div>
              </div>
            </div>
          )}

          {state != 11 && (
            <div className="button-component">
              <div className="prev button" onClick={onPrev}>
                Back
              </div>
              <div className="next button" onClick={onNext}>
                {getButtonType()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default JobSeekers;
