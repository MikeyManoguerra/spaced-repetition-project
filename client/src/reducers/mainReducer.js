import {
  SET_ANSWER,
  GET_QUESTION_SUCCESS,
  EVALUATE_ANSWER,
  RESET_ANSWER_STATUS,
  HANDLE_STREAK_CORRECT,
  HANDLE_STREAK_INCORRECT,
  GET_SCORES_SUCCESS,
  REVEAL_ANSWER
} from '../actions/index.js'




const initialState = {
  answer: '',
  correct: null,
  currentWord: 'null',
  streak: 0,
  scores: []
}
//  send german word and true false for right wrong

export const mainReducer = (state = initialState, action) => {
  if (action.type === SET_ANSWER) {
    return Object.assign({}, state, {
      answer: action.payload
    })
  }

  else if (action.type === GET_QUESTION_SUCCESS) {
    return Object.assign({}, state, {
      currentWord: action.question
    })
  }

  else if (action.type === REVEAL_ANSWER) {
    return Object.assign({}, state, {
      correct: action.serverAnswerObject
    })
  }

  else if (action.type === RESET_ANSWER_STATUS) {
    return Object.assign({}, state, {
      correct: null
    })
  }

  else if (action.type === HANDLE_STREAK_CORRECT) {
    return Object.assign({}, state, {
      streak: state.streak += 1
    })
  }

  else if (action.type === HANDLE_STREAK_INCORRECT) {
    return Object.assign({}, state, {
      streak: 0
    })
  }

  else if (action.type === GET_SCORES_SUCCESS) {
    return Object.assign({}, state, {
      scores: [...action.payload]
    })
  }
  return state
}