import { Router, useRouter } from "next/router";
import { forwardRef } from "react";
import { useSelector } from "react-redux";

const FormLastPage = forwardRef((props, ref) => {
  const token = useSelector((store) => store?.auth?.token);
  const isAssessment = useSelector(
    (store) => store?.user?.userInfo?.isAssessment
  );

  const router = useRouter();

  const handleLater = () => {
    router.push("/");
  };

  const handleTest = () => {
    router.push("QuizInstructionsPage");
  };
  return (
    <>
      <div className="custom-form-top form-last-page ">
        We are revewing your application.
        <br />
        <br />
        {isAssessment && `We’ll be in touch soon.`}
        <br />
        <br />
        Thank You!
        <br /> <br />
        {!isAssessment && `Next step is to take the assesment test:`}
        <br />
        {!isAssessment && (
          <div className="assessment-text">
            Note: You must complete the assessment in one sitting.
          </div>
        )}
      </div>

      {!isAssessment && (
        <div className="button-component">
          <div className="prev button" onClick={handleLater}>
            Later
          </div>
          <div className="next button" onClick={handleTest}>
            Begin Now
          </div>
        </div>
      )}
    </>
  );
});

export default FormLastPage;
