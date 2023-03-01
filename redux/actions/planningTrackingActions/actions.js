import {
  SETACTIVECOURSE,
  SETCOURSELIST,
  SETSUBTOPICS,
  SETSUBJECTLIST,
  SETPLANNINGDATA,
  SETBOOKS,
  UPDATESUBTOPIC,
  SETCONTENT,
} from "./actionType";

export const setCourseList = (data) => async (dispatch, getState) => {
  dispatch({
    type: SETCOURSELIST,
    payload: data,
  });
};

export const setActiveCourse = (id) => async (dispatch) => {
  dispatch({
    type: SETACTIVECOURSE,
    payload: id,
  });
};

export const setSubtopicData =
  (topicId, data) => async (dispatch, getState) => {
    const subTopics = getState().planning.subtopicData;

    let subtopicList = (data?.subTopicList ?? []).map((subtopic) => {
      subtopic.subjectId = data?.subjectId;
      subtopic.topic = data?.topic;
      return subtopic;
    });

    subTopics[topicId] = subtopicList;

    dispatch({
      type: SETSUBTOPICS,
      payload: { ...subTopics },
    });
  };

export const setSubtopicContent =
  (subtopicId, data) => async (dispatch, getState) => {
    const content = getState().planning.content;
    content[subtopicId] = data;

    dispatch({
      type: SETCONTENT,
      payload: { ...content },
    });
  };

export const setPlanningData =
  (subjectId, data) => async (dispatch, getState) => {
    const planningData = getState().planning.planningData;
    planningData[subjectId] = data;

    dispatch(sortSubjects(subjectId));

    dispatch({
      type: SETPLANNINGDATA,
      payload: { ...planningData },
    });
  };

export const setSubjectList = (data) => async (dispatch, getState) => {
  dispatch({
    type: SETSUBJECTLIST,
    payload: data,
  });
};

export const setBooks = (topicId, data) => async (dispatch, getState) => {
  const books = getState().planning.books;
  books[topicId] = data;

  dispatch({
    type: SETBOOKS,
    payload: { ...books },
  });
};

export const updateSubtopic = (topic, subject) => (dispatch, getState) => {
  let subtopicData = getState().planning.subtopicData;
  let topicData = getState().planning.planningData;

  topicData?.[subject] && (topicData[subject] = null);
  subtopicData?.[topic] && (subtopicData[topic] = null);

  dispatch({
    type: UPDATESUBTOPIC,
    payload: {
      subtopicData,
      planningData: topicData,
    },
  });
};

export const clearPlanningData = () => (dispatch) => {
  dispatch({
    type: UPDATESUBTOPIC,
    payload: {
      subtopicData: {},
      planningData: {},
    },
  });
};

export const onSubtopicUnlock = (topicId, index) => (dispatch, getState) => {
  let subtopicData = getState().planning.subtopicData;
  let subtopic = subtopicData?.[topicId] ?? [];

  if (index + 1 < subtopic.length) {
    subtopic[index + 1].todaysFreeSubTopic = true;
  }
  if (index + 2 < subtopic.length) {
    subtopic[index + 2].todaysFreeSubTopic = true;
  }

  subtopicData[topicId] = subtopic;

  dispatch({
    type: SETSUBTOPICS,
    payload: { ...subtopicData },
  });
};

export const sortSubjects = (id) => (dispatch, getState) => {
  let subjects = getState().planning.subjectList;
  let weakSubject = getState().user.userInfo?.weakSubject?.[0];

  if (id === weakSubject) {
    subjects.forEach((subject, index) => {
      if (subject?.id == id) {
        subjects.splice(index, 1);
        subjects.unshift(subject);
      }
    });
  }

  dispatch({
    type: SETSUBJECTLIST,
    payload: [...subjects],
  });
};

export const updateSubjectRetention = (subjectId) => (dispatch, getState) => {
  let subjectList = getState().planning.subjectList ?? [];

  subjectList.forEach((subject) => {
    if (subject?.id === subjectId) {
      let completedSubtopics = (subject?.completedSubtopics ?? 0) + 1;
      let totalSubtopics = subject?.totalSubtopics ?? 1;
      subject.completedSubtopics = completedSubtopics;
      subject.percentage = (completedSubtopics / totalSubtopics) * 100;
    }
  });

  dispatch(setSubjectList(subjectList));
};

export const onSubtopicComplete = () => (dispatch, getState) => {
  const quizDetails = getState().assessment.quizDetails;
  // const { isLastTopic = false, isLastSubtopic = false } = quizDetails;
  // const isLast = isLastSubtopic && isLastTopic;
  // isLastSubtopic && !isLastTopic && dispatch(setAppreciationPopup(7));
  dispatch(setGuestPrompt(true));
  dispatch(updateSubtopic(quizDetails?.topic, quizDetails?.subject));
  dispatch(setSubtopicContentComplete(quizDetails?.subtopic ?? []));
  dispatch(updateSubjectRetention(quizDetails?.subject));
};

export const setSubtopicContentComplete =
  (subtopics) => (dispatch, getState) => {
    let content = getState().planning.content;
    let result = getState().assessment.result;

    subtopics.forEach((subtopicId) => {
      const testCount = (content[subtopicId]?.subtopic?.testCount ?? 0) + 1;
      content[subtopicId].subtopic.retention =
        (result?.percentage ?? 0) * (1 - findDepriciation(testCount) / 100);
      content[subtopicId].subtopic.testCount = testCount;
      trackRevisionCount("retest", testCount);
    });

    dispatch({
      type: SETCONTENT,
      payload: { ...content },
    });
  };
