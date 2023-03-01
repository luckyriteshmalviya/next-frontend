import React, { useEffect, useState } from "react";
import Button from "Components/Button/Button";
import { useDispatch } from "react-redux";
import { getTestData } from "services/assessment";
import { useRouter } from "next/router";

const QuizInstructions = () => {
  const router = useRouter();

  const [buttonText, setButtonText] = useState("Start Test");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTestData());
  }, []);

  const computeTitle = () => {
    return "Assesment Test";
  };

  const onStartTest = () => {
    setButtonText("Starting");
    setTimeout(() => {
      setButtonText("Start Test");
    }, 10000);
    dispatch(getTestData(router));
  };

  return (
    <div className="quiz-container-whole-section">
      <div className="quiz-container-wrapper">
        <div className="quiz-instructions-container">
          <div className="list-container">
            <div className="quiztitle-wrapper">
              <h1>{computeTitle()}</h1>
            </div>
            <div className="detail-container-wrapper ">
              <div className="detail-container">
                <div className="detail-card">
                  <p className="title">No. of questions</p>
                  <p className="description">{10}</p>
                </div>
                <div className="detail-card">
                  <p className="title">Time alloted</p>
                  <p className="description">
                    1 <span>min/question</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="instructions-container">
              <div className="instructions-heading">
                <div className="img-wrapper">
                  <img src="/assets/svgIcons/quiz-instruction-mopid.svg" />
                </div>
                <h3>Instructions</h3>
              </div>
              <ul className="instruction-list">
                <li>
                  Please answer the questions honestly as this test will help us
                  identify your competencies and curate the most suitable
                  opportunities for you.
                </li>
                <li className="instruction-text-new">
                  The assessment test once started needs to be finished in one
                  sitting.
                </li>
              </ul>
              <div className="action-list-container">
                <div className="section">
                  <div className="instruction-container">
                    <div className="btn1">Submit</div>
                    <p>Click to submit your test.</p>
                  </div>
                  <div className="instruction-container">
                    <div className="next-btn">Next</div>
                    <p>Click to go to next question</p>
                  </div>
                  <div className="instruction-container">
                    <div className="prev-btn">Previous</div>
                    <p>Click to go to previous question</p>
                  </div>
                </div>
                <div className="section">
                  <div className="instruction-container">
                    <div className="view-all">View all</div>
                    <p>Click to view all the questions.</p>
                  </div>
                  <div className="instruction-container">
                    <div className="wishlist-img">
                      <img src="assets/svgIcons/ins-wishlist@3x.svg" />
                    </div>
                    <p>Click to attempt the question later.</p>
                  </div>
                  <div className="instruction-container">
                    <div className="timer">
                      <img src="/assets/svgIcons/ins-clock.svg" />
                      <p>10:00</p>
                    </div>
                    <p>Timer will start once you start test.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="button-wrapper">
            <Button
              nameone={buttonText}
              active={true}
              width="test-width"
              activeStateHandler={onStartTest}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInstructions;
