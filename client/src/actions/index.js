import { API_BASE_URL } from '../config'
export const SET_ANSWER = 'SET_ANSWER';

export const setAnswer = userInput => ({
  type: SET_ANSWER,
  userInput
});

export const GET_QUESTION = 'GET_QUESTION';

export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';

export const getQuestionSuccess = question => ({
  type: GET_QUESTION_SUCCESS,
  question
})

export const getQuestion = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/learn`, {
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(question => {
      console.log(question);
      dispatch(getQuestionSuccess(question));
    })
}

export const REVEAL_ANSWER = 'REVEAL_ANSWER';
export const revealAnswer = correctAnswer => ({
  type: REVEAL_ANSWER,
  correctAnswer
})

export const EVALUATE_ANSWER = 'EVALUATE_ANSWER';
export const evaluateAnswer = (userAnswerObject) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/learn`, {
    method: 'POST',
    // mode: 'no-cors',
    body: JSON.stringify(userAnswerObject),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  }).then((res) => {
    if (!res.ok) {
      throw new Error('no answer response!')
    }
    return res.json()
  })
    .then(correctAnswer => {
      if (correctAnswer.correct) {
        dispatch(handleStreakCorrect())
      } else {
        dispatch(handleStreakIncorrext())
      }
      return dispatch(revealAnswer(correctAnswer))
    }).catch(err => console.log(err))
}

export const RESET_ANSWER_STATUS = 'RESET_ANSWER_STATUS';
export const resetAnswerStatus = () => ({
  type: RESET_ANSWER_STATUS
});

export const NEXT_QUESTION = 'NEXT_QUESTION';

export const nextQuestion = (foreignLanguage, correct) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/learn`, {
    method: 'POST',
    // mode: 'no-cors',
    body: JSON.stringify({ foreignLanguage: foreignLanguage, correct: correct }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  }).then(() => dispatch(getQuestion()));
}

export const HANDLE_STREAK_CORRECT = 'HANDLE_STREAK_CORRECT';

export const handleStreakCorrect = () => ({
  type: HANDLE_STREAK_CORRECT,

})

export const HANDLE_STREAK_INCORRECT = 'HANDLE_STREAK_INCORRECT';

export const handleStreakIncorrext = () => ({
  type: HANDLE_STREAK_INCORRECT,

})

export const GET_SCORES = 'GET_SCORES';

export const GET_SCORES_SUCCESS = 'GET_SCORES_SUCCESS';

export const getScoresSuccess = (scores) => ({
  type: GET_SCORES_SUCCESS,
  scores
})

export const getScores = () => (dispatch, getState) => {
  console.log('this did run');
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/score`, {
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(scores => {
      dispatch(getScoresSuccess(scores));
    })
};



