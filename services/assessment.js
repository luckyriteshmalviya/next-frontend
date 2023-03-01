import Request from "utils/request";
import {
  setAssessmentQuestions,
  setResult,
} from "redux/actions/assessmentActions/actions";

export const getAssessmentData =
  (page = 1, config) =>
  async (dispatch, getState) => {
    try {
      const courseId = getState().user.userInfo?.courseId;
      const response = await Request({
        method: "POST",
        url: "/post/lists",
        data: {
          courseId,
          page,
          post: "mcq",
        },
        ...config,
      });

      const { Code, data } = response.data;

      if (Code === 1) {
        dispatch(setAssessmentQuestions(data.postList, page));
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

export const getTestData = (router) => async (dispatch) => {
  try {
    const response = await Request({
      method: "GET",
      url: "test/getTest",
    });

    const { status_code, data } = response.data;

    if (status_code === 200) {
      dispatch(setAssessmentQuestions(data?.questions, 1, data?.testDetails));
      router.push("/TestPage/1");
      return [true, ""];
    } else {
      return [false, "Already Given Test"];
    }
  } catch (error) {
    console.log(error);
    return [false, "Network Error"];
  }
};

export const submitTest = (config) => async (dispatch, getState) => {
  try {
    const quizResponse = getState().assessment.response;
    const quizDetails = getState().assessment.quizDetails;

    const response = await Request({
      method: "POST",
      url: "/test/submit",
      data: {
        response: quizResponse ?? {},
        testId: quizDetails?.testId ?? [],
      },
      ...config,
    });

    const { status_code, message } = response.data;

    if (status_code === 200) {
      console.log(message);
    }
    return false;
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const reportQuestion = async (questionId, config) => {
  try {
    const response = await Request({
      method: "POST",
      url: "/question/report",
      data: { questionId },
      ...config,
    });

    const { status_code, message, data } = response.data;

    if (status_code === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
