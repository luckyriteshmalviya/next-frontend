import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const analysisCardType = [
  {
    name: "Answered",
    class: "answered",
    no: ''
  },
  {
    name: "Unanswered",
    class: "unanswered",
    no: ''
  },
  {
    name: "Attempt later",
    class: "later",
    no: ''
  },
];

const resultCardType = [
  {
    name: "Correct",
    class: "correct",
  },
  {
    name: "Unanswered",
    class: "unanswered",
  },
  {
    name: "Wrong",
    class: "incorrect",
  },
];

const OverviewCard = ({ title = "", type, setShowAnalysisCard, path, setAnimatedValue }) => {

  const router = useRouter()

  const questions = useSelector((store) => store?.assessment?.questions);
  const response = useSelector((store) => store?.assessment?.response);
  const solution = useSelector((store) => store?.assessment?.solution);

  // const redirect = useRedirect();

  const computeClass = (question) => {
    let userResponse = response?.[question?.uid];
    let questionSolution = solution?.[question?.uid];
    if (type === "analysis") {
      if (userResponse) {
        if (userResponse?.status) {
          return "later";
        }
        if (userResponse?.options?.length > 0) {
          return "answered";
        }
      }
    }
    if (type === "result") {
      if (userResponse?.options?.includes(questionSolution?.option_id)) {
        return "correct";
      }
      if (userResponse?.options?.length > 0) {
        return "incorrect";
      }
    }
    return "unanswered";
  };

  const onCardQuestionClick = (id) => {
    router.push(path + id);
    setShowAnalysisCard(false);
    setAnimatedValue(true)

  };

  // const numberOfQuestions = () => {
  //   let questionObject = {
  //     answeredCount: null,
  //     unansweredCount: null,
  //     atemptLateCount: null
  //   };

  //   (Object.keys(response) ?? [])?.map((element) => {

  //     if (element === "timeTaken") analysisCardType[0].no = 1 || analysisCardType[0].no + 1



  //     else if (element.status) {

  //       analysisCardType[1].no = 1 || analysisCardType[1].no + 1
  //     }
  //     else {

  //       analysisCardType[2].no = 1 || analysisCardType[2].no + 1
  //     }

  //   })

  //   return questionObject;
  // }


  useEffect(() => {
    // let obj = numberOfQuestions()

    // console.log("object ", obj)

  }, [])

  return (
    <div className="overviewcard-container">
      <div className="top-card-section">
        <h2>Test Summary</h2>
        <div className="question-progress-list">
          {(questions ?? []).map(
            (question, index) => (
              <div
                className={`question-no ${computeClass(question)}`}
                onClick={() => onCardQuestionClick(index + 1)}
              >
                <p>{index + 1}</p>
              </div>
            )
          )}
        </div>
      </div>
      <div className="bottom-card-section">
        <div className="type-list">
          {(type === "analysis" ? analysisCardType : resultCardType).map(
            (type) => (
              <div className={`type ${type.class}`}>
                <span></span>
                <p className="type-text">{type.name} </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );

}


export default OverviewCard;
