import {
  SETASSESSMENTDATA,
  SETRESPONSE,
  SETRESULT,
  UPDATERESULT,
  SETSHOWANSWERS,
  CLEARDATA,
  SKIPASSESSMENT,
} from "./actionType";

//MAJOR REFACTORING REEQUIRED
export const setAssessmentQuestions =
  (questions, id, details = null) =>
  async (dispatch, getState) => {
    dispatch({
      type: SETASSESSMENTDATA,
      payload: {
        questions,
        id,
        details,
      },
    });
  };

export const setQuestionTime =
  (questionId, timeTaken) => (dispatch, getState) => {
    const response = getState()?.assessment?.response ?? {};
    let options = response?.[questionId]?.options ?? [];
    let status = response?.[questionId]?.status;
    let totalTime = parseFloat(response?.[questionId]?.timeTaken ?? 0);
    totalTime = parseFloat(totalTime + parseFloat(timeTaken)).toFixed(2);
    response[questionId] = { timeTaken: totalTime, options, status };

    dispatch({
      type: SETRESPONSE,
      payload: { ...response },
    });
  };

export const setQuestionStatus =
  (questionId, status, optionId) => async (dispatch, getState) => {
    const response = getState()?.assessment?.response ?? {};
    response[questionId] = { status, optionId };

    dispatch({
      type: SETRESPONSE,
      payload: response,
    });
  };

export const setQuestionOption =
  (questionId, optionId, isMultiple) => (dispatch, getState) => {
    const response = getState().assessment.response ?? {};
    let options = response?.[questionId]?.options ?? [];
    let status = response?.[questionId]?.status;
    let timeTaken = response?.[questionId]?.timeTaken ?? 0;

    if (options.includes(optionId)) {
      if (isMultiple) {
        let filteredOptions = options.filter((option) => option !== optionId);
        options = filteredOptions;
      } else {
        options = [];
      }
    } else {
      if (isMultiple) {
        options.push(optionId);
      } else {
        options = [optionId];
      }
    }

    response[questionId] = { status, options, timeTaken };

    dispatch({
      type: SETRESPONSE,
      payload: { ...response },
    });
  };

export const setAnswerLater = (questionId) => (dispatch, getState) => {
  const response = getState()?.assessment?.response ?? {};
  let options = response?.[questionId]?.options ?? [];
  let status = response?.[questionId]?.status;

  if (status === true) {
    status = false;
  } else {
    status = true;
  }

  response[questionId] = { status, options };

  dispatch({
    type: SETRESPONSE,
    payload: { ...response },
  });
};

export const removeResponse = (questionId, status) => (dispatch, getState) => {
  const response = getState().assessment.response ?? {};
  if (status === "answered") {
    response[questionId].optionId = null;
  } else {
    response[questionId].status = null;
  }

  dispatch({
    type: SETRESPONSE,
    payload: response,
  });
};

export const setResult = (data) => (dispatch, getState) => {
  let solution = data?.solution;
  let result = data;

  dispatch({
    type: SETRESULT,
    payload: {
      result,
      solution,
    },
  });
};

/**
 * function called when user complete the assessment test
 * 1. dispatches this result to be stored in redux
 * 2. stores the result in local storage for future visits
 * @returns
 */
export const computeResult = () => (dispatch, getState) => {
  let questions = getState().assessment.questions;
  let response = getState().assessment.response;
  let quizDetails = getState().assessment.quizDetails;
  let subjects = getState().planning.subjectList ?? [];
  let marksPerQuestion = quizDetails?.perQuestionMark ?? 10;
  let cutoff = quizDetails?.cutOff ?? 60;
  let totalMarks = 0;
  let percentage = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let subjectWiseResult = {};
  let temp = [];
  let weakSubjects = [];
  let specializedSubject = [];
  let subtopicScore = {};
  let marksPerSubtopic = 5;

  questions.forEach(({ _id, optionAns, subject, subTopic }) => {
    let marks = 0;
    let userResponse = response?.[_id];
    if (userResponse) {
      let marksPerOption = marksPerQuestion / optionAns?.length;
      (userResponse?.options ?? []).forEach((option) => {
        if (optionAns?.includes(option)) {
          marks += marksPerOption;
        } else {
          marks = 0;
        }
      });
      if (marks === marksPerQuestion) {
        correctAnswers++;
        response[_id].isCorrect = true;
        totalMarks += marksPerQuestion;
      } else {
        incorrectAnswers++;
      }
      subtopicScore[subTopic] = (subtopicScore[subTopic] ?? 0) + marks;
    }
    let { totalSubjectMarks, currentMarks } = subjectWiseResult?.[subject] ?? {
      totalSubjectMarks: 0,
      currentMarks: 0,
    };
    subjectWiseResult[subject] = {
      totalSubjectMarks: totalSubjectMarks + marksPerQuestion,
      currentMarks: currentMarks + marks,
    };
  });

  Object.keys(subtopicScore).forEach((key) => {
    subtopicScore[key] = parseInt(
      ((subtopicScore?.[key] ?? 0) / marksPerSubtopic) * 100
    );
  });

  Object.keys(subjectWiseResult ?? {}).forEach((key) => {
    let sub = subjects.find((tempSubject) => tempSubject?.name?._id === key);
    let percentage =
      (subjectWiseResult?.[key]?.currentMarks /
        subjectWiseResult?.[key]?.totalSubjectMarks) *
      100;
    let subjectObj = {
      subjectId: key,
      name: sub?.name?.name,
      totalSubjectMarks: subjectWiseResult?.[key]?.totalSubjectMarks ?? 0,
      currentMarks: subjectWiseResult?.[key]?.currentMarks ?? 0,
      percentage: percentage,
    };
    temp.push(subjectObj);

    if (percentage < cutoff) {
      weakSubjects.push(subjectObj);
    } else {
      specializedSubject.push(subjectObj);
    }
  });

  if (weakSubjects?.length === 0) {
    let tempArray = temp.sort(
      (subject1, subject2) => subject1?.percentage - subject2?.percentage
    );
    specializedSubject = [];
    tempArray.forEach((subject, index) => {
      if (index >= tempArray.length / 2) {
        specializedSubject.push(subject);
      } else {
        weakSubjects.push(subject);
      }
    });
  }

  percentage = (totalMarks / (questions.length * marksPerQuestion)) * 100;

  let assessmentData = {
    totalMarks,
    percentage,
    subjectWiseResult: temp,
    weakSubjects,
    specializedSubject,
    isPass: quizDetails?.cutOff <= percentage,
    timeTaken: "00",
    correctAnswers,
    totalQuestions: questions?.length ?? 0,
    subtopicScore,
  };

  dispatch({
    type: SETRESULT,
    payload: assessmentData,
  });

  dispatch({
    type: SETRESPONSE,
    payload: response,
  });

  return {
    totalMarks,
    correctAnswers,
    incorrectAnswers,
    isPass: quizDetails?.cutOff <= percentage,
  };
};

export const checkIfAboveCutOff = () => (dispatch, getState) => {
  let result = getState().assessment.result;
  let quizDetails = getState().assessment.quizDetails;
  let isPass = parseInt(quizDetails?.cutOff) <= parseInt(result?.percentage);
  return isPass;
};

export const saveResult = () => (dispatch, getState) => {
  let quizDetails = getState()?.assessment?.quizDetails;
  let result = getState()?.assessment?.result;

  let assessmentData = {
    quizDetails,
    result,
  };

  localStorage.setItem("assessment-data", JSON.stringify(assessmentData));
};

export const editResult = (weakSubject) => (dispatch, getState) => {
  let result = getState().assessment.result;
  let data = localStorage.getItem("assessment-data");
  if (data) {
    data = JSON.parse(data);
    let weakSubjectData = {
      [weakSubject]: data.result.moduleResult[weakSubject],
    };
    data.result.moduleResult = weakSubjectData;
    result.moduleResult = weakSubjectData;
    dispatch({
      type: UPDATERESULT,
      payload: result,
    });
    localStorage.setItem("assessment-data", JSON.stringify(data));
  }
};

export const setShowAnswers =
  (bool = false) =>
  (dispatch) => {
    dispatch({
      type: SETSHOWANSWERS,
      payload: bool,
    });
  };

export const clearLocalData = () => {
  localStorage.removeItem("assessment-data");
};

export const clearAssessmentData = () => (dispatch) => {
  dispatch({ type: CLEARDATA });
};
export const skipAssessment = () => (dispatch) => {
  dispatch({ type: SKIPASSESSMENT });
  localStorage.setItem("assessment-skipped", true);
};
