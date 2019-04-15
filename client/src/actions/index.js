import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';


export const SET_ANSWER = 'SET_ANSWER';
export const setAnswer = userInput => ({
  type: SET_ANSWER,
  userInput
});

export const SET_CURRENT_SUBJECT = 'SET_CURRENT_SUBJECT';
export const setCurrentSubject = subject => ({
  type: SET_CURRENT_SUBJECT,
  subject
})


export const GET_AVAILABLE_SUBJECTS_SUCCESS = 'GET_AVAILABLE_SUBJECTS_SUCCESS';
export const getAvailableSubjectsSuccess = subjects => ({
  type: GET_AVAILABLE_SUBJECTS_SUCCESS,
  subjects
})

export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const getQuestionSuccess = question => ({
  type: GET_QUESTION_SUCCESS,
  question
})

export const RESET_ANSWER_STATUS = 'RESET_ANSWER_STATUS';
export const resetAnswerStatus = () => ({
  type: RESET_ANSWER_STATUS
});

export const REVEAL_ANSWER = 'REVEAL_ANSWER';
export const revealAnswer = correctAnswer => ({
  type: REVEAL_ANSWER,
  correctAnswer
})

export const HANDLE_STREAK_CORRECT = 'HANDLE_STREAK_CORRECT';
export const handleStreakCorrect = () => ({
  type: HANDLE_STREAK_CORRECT,
})

export const HANDLE_STREAK_INCORRECT = 'HANDLE_STREAK_INCORRECT';
export const handleStreakIncorrext = () => ({
  type: HANDLE_STREAK_INCORRECT,
})

export const GET_SCORES_SUCCESS = 'GET_SCORES_SUCCESS';
export const getScoresSuccess = (scores) => ({
  type: GET_SCORES_SUCCESS,
  scores
})

export const UPDATE_USER_SUBJECTS_SUCCESS = 'UPDATE_USER_SUBJECTS_SUCCESS';
export const updateUserSubjectsSuccess = (userSubjects) => ({
  type: UPDATE_USER_SUBJECTS_SUCCESS,
  userSubjects
})

export const EVALUATE_ANSWER_REQUEST = 'EVALUATE_ANSWER_REQUEST'
export const evaluateAnswerRequest = () => ({
  type: EVALUATE_ANSWER_REQUEST
})

export const EVALUATE_ANSWER_ERROR = 'EVALUATE_ANSWER_ERROR'
export const evaluateAnswerError = (error) => ({
  type: EVALUATE_ANSWER_ERROR,
  error
})
export const GET_AVAILABLE_SUBJECTS_REQUEST = 'GET_AVAILABLE_SUBJECTS_REQUEST';
export const getAvailableSubjectsRequest = () => ({
  type: GET_AVAILABLE_SUBJECTS_REQUEST
})
export const GET_AVAILABLE_SUBJECTS_ERROR = 'GET_AVAILABLE_SUBJECTS_ERROR';
export const getAvailableSubjectsError = (error) => ({
  type: GET_AVAILABLE_SUBJECTS_ERROR,
  error
})
export const GET_QUESTION_REQUEST = 'GET_QUESTION_REQUEST';
export const getQuestionRequest = () => ({
  type: GET_QUESTION_REQUEST
})
export const GET_QUESTION_ERROR = 'GET_QUESTION_ERROR';
export const getQuestionError = (error) => ({
  type: GET_QUESTION_ERROR,
  error
})
export const NEXT_QUESTION_REQUEST = 'NEXT_QUESTION_REQUEST';
export const nextQuestionRequest = () => ({
  type: NEXT_QUESTION_REQUEST
})
export const NEXT_QUESTION_ERROR = 'NEXT_QUESTION_ERROR';
export const nextQuestionError = (error) => ({
  type: NEXT_QUESTION_ERROR,
  error
})
export const GET_SCORES_REQUEST = 'GET_SCORES_REQUEST';
export const getScoresRequest = () => ({
  type: GET_SCORES_REQUEST
})
export const GET_SCORES_ERROR = 'GET_SCORES_ERROR';
export const getScoresError = (error) => ({
  type: GET_SCORES_ERROR,
  error
})
export const UPDATE_USER_SUBJECTS_REQUEST = 'UPDATE_USER_SUBJECTS_REQUEST'
export const updateUserSubjectsRequest = () => ({
  type: UPDATE_USER_SUBJECTS_REQUEST
})
export const UPDATE_USER_SUBJECTS_ERROR = 'UPDATE_USER_SUBJECTS_ERROR'
export const updateUserSubjectsError = (error) => ({
  type: UPDATE_USER_SUBJECTS_ERROR,
  error
})
export const NEW_SUBJECT_LIST_REQUEST = 'NEW_SUBJECT_LIST_REQUEST'
export const newSubjectListRequest = () => ({
  type: NEW_SUBJECT_LIST_REQUEST
})
export const NEW_SUBJECT_LIST_ERROR = 'NEW_SUBJECT_LIST_ERROR'
export const newSubjectListError = (error) => ({
  type: NEW_SUBJECT_LIST_ERROR,
  error
})


export const EVALUATE_ANSWER = 'EVALUATE_ANSWER';
export const evaluateAnswer = (userAnswerObject) => (dispatch, getState) => {
  dispatch(evaluateAnswerRequest())
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/learn`, {
    method: 'POST',
    body: JSON.stringify(userAnswerObject),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  }).then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(correctAnswer => {
      if (correctAnswer.correct) {
        dispatch(handleStreakCorrect())
      } else {
        dispatch(handleStreakIncorrext())
      }
      return dispatch(revealAnswer(correctAnswer))
    }).catch(error => {
      return dispatch(evaluateAnswerError(error))
    })
}






export const getAvailableSubjects = () => (dispatch, getState) => {
  dispatch(evaluateAnswerRequest())
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/learn/subjects`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(subjects => {
      dispatch(getAvailableSubjectsSuccess(subjects));
    })
    .catch(error => dispatch(evaluateAnswerError(error)))
}



export const getQuestion = (subjectId) => (dispatch, getState) => {
  dispatch(getQuestionRequest())
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/learn/${subjectId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(question => {
      dispatch(getQuestionSuccess(question));
    })
    .catch(error => dispatch(getQuestionError(error)))
}





export const nextQuestion = (foreignLanguage, correct) => (dispatch, getState) => {
  dispatch(nextQuestionRequest())
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/learn`, {
    method: 'POST',
    body: JSON.stringify({ foreignLanguage: foreignLanguage, correct: correct }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(() => dispatch(getQuestion()))
    .catch(error => dispatch(nextQuestionError(error)))
}



export const getScores = () => (dispatch, getState) => {
  dispatch(getScoresRequest())
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/score`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(scores => {
      dispatch(getScoresSuccess(scores));
    })
    .catch(error => dispatch(getScoresError(error)))
};



export const updateUserSubjects = () => (dispatch, getState) => {
  dispatch(updateUserSubjectsRequest())
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/learn/`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((userSubjects) => {
      return dispatch(updateUserSubjectsSuccess(userSubjects));
    }).catch((error) => dispatch(updateUserSubjectsError(error)))
};


export const newSubjectList = (availableSubject) => (dispatch, getState) => {
  dispatch(newSubjectListRequest())
  let subjectId = availableSubject.id

  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/learn/newSubject/${subjectId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(() => {
      dispatch(updateUserSubjects());
      dispatch(setCurrentSubject(availableSubject))
      return dispatch(getQuestion(subjectId));
    }).catch((error) => dispatch(newSubjectListError(error)))
};

