import {
  SETASSESSMENTDATA,
  SETRESPONSE,
  SETRESULT,
  UPDATERESULT,
  SETSHOWANSWERS,
  CLEARDATA,
} from '../actions/assessmentActions/actionType';
import {LOGOUT} from '../actions/authActions/actionType';

const initialState = {
  quizId: null,
  questions: [],
  solution: null,
  response: null,
  result: null,
  quizDetails: null,
  showAnswers: false,
};

const currentAffairsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETASSESSMENTDATA:
      return {
        ...state,
        questions: action.payload.questions,
        quizId: action.payload.id,
        quizDetails: action.payload.details,
        solution: null,
        result: null,
        response: null,
        showAnswers: false,
      };

    case SETRESPONSE:
      return {
        ...state,
        response: action.payload,
      };

    case SETRESULT:
      return {
        ...state,
        result: action.payload.result,
        solution: action.payload.solution,
      };

    case SETSHOWANSWERS:
      return {
        ...state,
        showAnswers: action.payload,
      };

    case CLEARDATA:
      return {
        ...state,
        quizId: null,
        questions: [],
        response: null,
        result: null,
        quizDetails: null,
        solution: null,
        showAnswers: false,
      };

    case UPDATERESULT:
      return {
        ...state,
        result: action.payload,
      };

    case LOGOUT:
      return {
        ...state
      };

    default:
      return state;
  }
};

export default currentAffairsReducer;
