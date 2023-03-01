import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import MathJax from "react-mathjax2";
import useTimer from "customhooks/useTimer";
import { submitTest } from "services/assessment";
import {
  setQuestionOption,
  clearAssessmentData,
  saveResult,
  setAnswerLater,
  setQuestionTime,
} from "redux/actions/assessmentActions/actions";
import {
  sameHeightDiv,
  getAlphabet,
  heightOnDestroy,
  getSeconds,
  throttle,
} from "utils/function";
import QuestionContainer from "Layout/Test/QuestionContainer/QuestionContainer";
import OverviewCard from "./OverviewCard/OverviewCard";
import ConfirmationPopup from "./ConfirmationPopup/ConfirmationPopup";
import ReportPopup from "./ReportPopup/ReportPopup";
import NavBar from "Components/Navbar/Navbar";
import ResultCard from "./ResultCard/ResultCard";
import { setNestedObjectValues } from "formik";

const Test = () => {
  const [showAnalysisCard, setShowAnalysisCard] = useState(false);
  const [showPopup, setShowPopup] = useState(null);
  const [showResultCard, setShowResultCard] = useState(false);
  const [showSolutionCard, setShowSolutionCard] = useState(false);
  const [reportQues, setReportQues] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [pageType, setPageType] = useState("analysis");
  const [animate, setAnimate] = useState(false);

  const token = useSelector((store) => store?.auth?.token);
  const questions = useSelector((store) => store?.assessment?.questions) || [];
  const response = useSelector((store) => store?.assessment?.response);
  const solution = useSelector((store) => store?.assessment?.solution);
  const quizDetails = useSelector((store) => store?.assessment?.quizDetails);
  const dispatch = useDispatch();

  const router = useRouter();
  const [minutes, seconds, finish] = useTimer(quizDetails?.totalTime ?? 0, 0);

  const { questionId } = router.query;
  const name = "assessment";
  const currentQuestion = questions?.[questionId - 1] ?? {};
  const isAttempLater = response?.[currentQuestion?.uid]?.status;
  const selectedOptions = response?.[currentQuestion?.uid]?.options ?? [];

  // const buttonClickThrottle = throttle(setAnimate, 1000);

  const setAnimatedValue = (value) => {
    setAnimate(value)
  }


  useEffect(() => {
    initialCheck();
    return () => onDestroy();
  }, []);

  useEffect(() => {
    initialFunction();
  }, [questionId]);

  useEffect(() => {
    let timer
    timer = setTimeout(() => {
      setAnimate(false)
    }, 500)

  }, [questionId])

  /**
   * this runs if timer finishes
   */
  useEffect(() => {
    finish && pageType === "analysis" && onSubmit();
  }, [finish]);

  /**
   * initial function to run
   */
  const initialFunction = () => {
    if (currentQuestion?.type !== "Math") {
      setOptionHeight();
    }
  };

  const setOptionHeight = () => {
    heightOnDestroy(".option-wrapper");
    sameHeightDiv(".option-wrapper");
  };

  const initialCheck = () => {
    if (name === "assessment") {
      if (solution && token) {
        setPageType("result");
        router.push(getPath() + "1");
      } else if (solution) {
        router.push("assessment-result");
      }
    }
  };

  const onDestroy = () => {
    if (name !== "assessment") {
      dispatch(clearAssessmentData());
    }
  };

  const redirectToPrev = () => {
    let path = "/";

    router.push(path);
  };

  const getPath = () => {
    let newPath = router.pathname.split("/");
    newPath.pop();
    newPath = newPath.join("/");
    return newPath.substring(0, newPath.length) + "/";
  };

  /**
   * called when option is clicked
   * @param {*} option
   * @returns
   */
  const onOptionClick = (option) => {
    if (pageType === "result") return;
    dispatch(
      setQuestionOption(
        currentQuestion?.uid,
        option?.uid,
        currentQuestion?.optionAns?.length > 1
      )
    );
  };

  /**
   * this checks if option is active or not
   * @param {} option
   * @returns
   */
  const isOptionActive = (option) => {
    if (pageType === "result") return;
    let optionId = option?.uid ?? "";
    if (selectedOptions.includes(optionId)) {
      return "active-state";
    }
    return "";
  };

  /**
   * onAttempt later click to update status in redux
   */
  const onAttemptLater = () => {
    dispatch(setAnswerLater(currentQuestion?.uid));
  };

  const trackTime = () => {
    if (!solution) {
      let timeTaken = getSeconds(new Date(), startTime);
      dispatch(setQuestionTime(currentQuestion?.uid, timeTaken));
      setStartTime(new Date());
    }
  };

  /**
   * runs when submit button is clicked
   * 1. reinitializes selected option state
   * 2. calls compute result function
   * 3. calls functions based on type of page
   */
  const onSubmit = async () => {
    trackTime();
    dispatch(submitTest());
    setShowResultCard(true);
  };

  const onGuestAssessmentSubmit = () => {
    if (!token) {
      dispatch(saveResult());
    } else {
      dispatch(updateUserInfo({ isAssessmentComplete: true }));
    }
    // router.push("assessment-result");
  };

  /**
   * to hide/show popup
   */
  const togglePopup = () => {
    setShowPopup(null);
  };

  /**
   *
   * @param {*} option
   * checks if the option is correct or not, this runs are result is computed or user has submitted the test
   * @returns
   */
  const computeQuestionResult = (option) => {
    const question = solution?.[currentQuestion?.uid];
    if (pageType === "analysis") return "";
    let userResponse = response?.[currentQuestion?.uid];
    let className = "";
    if (userResponse) {
      if (userResponse?.options.includes(option.uid)) {
        if (question?.option_id == option.uid) {
          className = "correct";
        } else {
          className = "incorrect";
        }
      }
    }
    if (question?.option_id == option.uid) {
      className = "correct";
    }
    return className;
  };

  /**
   * function when next button is called
   * 1. returns null when last question is reached
   * 2. if user has not yet submitted the test then dispatch the status of question ex - watchist or selected answer
   * common - router.push to the next page
   */
  const onNext = () => {
    if (questionId == questions.length) return;
    let redirectUrl = getPath() + (parseInt(questionId) + 1);
    router.push(redirectUrl);
    setAnimatedValue(true)
    // buttonClickThrottle(true)
    trackTime();
  };

  /**
   * function when previous button is clicked
   */
  const onPrev = () => {
    let redirectUrl = getPath() + (parseInt(questionId) - 1);
    if (questionId != 1) {
      router.push(redirectUrl);
    }
    setAnimatedValue(true)
    trackTime();
  };

  /**
   * onView all click
   */
  const onViewAll = () => {
    setShowAnalysisCard(!showAnalysisCard);
  };

  /**
   * onDashboard back pressed
   */
  const onBack = () => {
    if (showAnalysisCard) {
      setShowAnalysisCard(false);
    } else if (showResultCard) {
      setShowResultCard(false);
    } else {
      if (pageType === "analysis") {
        confirmQuit();
      } else {
        redirectToPrev();
      }
    }
  };

  const confirmSubmit = () => {
    if (pageType === "result") {
      redirectToPrev();
    } else {
      setShowPopup("submit");
    }
  };

  const confirmQuit = () => {
    setShowPopup("quit");
  };

  const onReportQuestion = () => {
    setReportQues(true);
  };

  const onReportPopupClose = () => {
    setReportQues(false);
  };

  const onViewSolution = () => {
    setShowSolutionCard(true);
  };

  const onSolutionCardClose = () => {
    setShowSolutionCard(false);

  };

  return (
    <div className={`quiz-container-wrapper `}>
      <NavBar title="Assesment Test" onViewAll={onViewAll} confirmQuit={confirmQuit} />
      <div className={`quiz-container type-${pageType}`}>
        <ConfirmationPopup
          show={showPopup}
          type={showPopup}
          togglePopup={togglePopup}
          onQuit={redirectToPrev}
          onSubmit={onSubmit}
          page={name}
        />
        <ReportPopup
          isOpen={reportQues}
          onClose={onReportPopupClose}
          question={currentQuestion}
          questionNo={questionId}
        />
        <ResultCard show={showResultCard} onContinue={redirectToPrev} />
        <div className="left-quiz-section">
          <div className="quiz-section">
            <div className="top-quiz-section">
              <div className="submit-end-container">
                {pageType === "analysis" && (
                  <img
                    className="quit-img"
                    src="/assets/svgIcons/quit-mopid.svg"
                    onClick={confirmQuit}
                  />
                )}
                <button className="btn-secondary" onClick={confirmSubmit}>
                  {pageType === "analysis" ? "Submit" : "End quiz"}
                </button>
              </div>
              <div className="progress-wrapper">
                <progress value={questionId} max={questions?.length ?? 0} />
              </div>
              <div className="question-timer-wrapper">
                <h2>
                  {pageType === "analysis" ? "Question" : "Solution"}{" "}
                  {questionId}/{questions?.length ?? 1}
                </h2>
                {pageType === "analysis" && (
                  <div className="timer-container">
                    <img src="/assets/svgIcons/timer.svg" />
                    <h2>
                      {minutes}:{seconds}
                    </h2>
                  </div>
                )}
              </div>
            </div>
            <div className={`assessment-container ${animate ? " assessment-container-animation" : ""}`}>
              <QuestionContainer question={currentQuestion} />
              <div className="button-wrapper">
                <div className="reportques-wrapper" onClick={onReportQuestion}>
                  <div className="icon-wrapper">
                    <img src={"/assets/svgIcons/report-flag.svg"} />
                  </div>
                  <p className="txt">Report Question</p>
                </div>

                {pageType === "analysis" && (
                  <div
                    className={`attemptlater-wrapper ${isAttempLater ? "attempt-later" : ""
                      }`}
                    onClick={onAttemptLater}
                  >
                    <div className="icon-wrapper">
                      <img
                        src={`/assets/svgIcons/attempt-later${isAttempLater ? "-active" : ""
                          }.svg`}
                      />
                    </div>
                    <p className="txt">Attempt later</p>
                  </div>
                )}
              </div>
              <div className="optionlist-container">
                <div
                  className={`option-list ${currentQuestion?.options?.[0].optionImage?.[0]
                    ? "option-img-question"
                    : ""
                    }`}
                >
                  {(currentQuestion?.options ?? []).map((option, index) => (
                    <div
                      className={`option-parent ${isOptionActive(
                        option
                      )} ${computeQuestionResult(option)}`}
                      onClick={() => onOptionClick(option)}
                    >
                      {option?.optionImage ? (
                        <div className="option-img">
                          <img src={option?.optionImage} />
                        </div>
                      ) : null}
                      <div className={`option-wrapper`}>
                        <div className="option-index">
                          <p>{getAlphabet(index)}</p>
                        </div>
                        {currentQuestion?.type === "math" ? (
                          <MathJax.Context
                            onLoad={setOptionHeight}
                            input="ascii"
                          >
                            <div className="math-equation">
                              <MathJax.Node>{option?.option}</MathJax.Node>
                            </div>
                          </MathJax.Context>
                        ) : (
                          <p className="option">
                            {option?.option ?? "hey brosssssssss"}
                          </p>
                        )}
                        <img
                          className="correct-img"
                          src={"assets/svgIcons/correct-answer.svg"}
                        />
                        <img
                          className="incorrect-img"
                          src={"assets/svgIcons/incorrect-answer.svg"}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {pageType === "result" &&
                  solution?.[currentQuestion?.uid]?.solution && (
                    <div className="solution-button-wrapper">
                      <p className="solution-button" onClick={onViewSolution}>
                        View Solution
                      </p>
                    </div>
                  )}
              </div>
              <div className="button-wrapper">
                <button className="btn-secondary" onClick={onPrev}>
                  Previous
                </button>
                {questionId >= questions.length && pageType === "analysis" ? (
                  <button className="btn-primary" onClick={confirmSubmit}>
                    Submit
                  </button>
                ) : (
                  <button className="btn-primary" onClick={onNext}>
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={`right-quiz-section ${showAnalysisCard ? "show" : ""}`}>
          {showAnalysisCard && (
            <NavBar title="Assesment Test" onViewAll={onViewAll} confirmQuit={onBack} />
          )}
          {pageType === "analysis" && (
            <div className="timer">
              <img src={"/assets/svgIcons/timer.svg"} />
              <h2>{`${minutes}:${seconds}`}</h2>
            </div>
          )}
          <OverviewCard
            type={pageType}
            setShowAnalysisCard={setShowAnalysisCard}
            path={getPath()}
            setAnimatedValue={setAnimatedValue}
          />
        </div>
      </div>
    </div >
  );
};

export default Test;
