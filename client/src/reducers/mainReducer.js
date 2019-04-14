import {
  SET_ANSWER,
  GET_QUESTION_SUCCESS,
  EVALUATE_ANSWER,
  RESET_ANSWER_STATUS,
  HANDLE_STREAK_CORRECT,
  HANDLE_STREAK_INCORRECT,
  GET_SCORES_SUCCESS,
  REVEAL_ANSWER,
  SET_CURRENT_LANGUAGE,
  GET_LANGUAGES_SUCCESS
} from '../actions/index.js'




const initialState = {
  //TODO change answer to userAnswer

  answer: '',
  correctAnswer: null,
  currentWord: 'null',
  streak: 0,
  scores: [],
  availableLanguages: ['Czech', 'German'],
  currentLanguage: 'German'
}
//  send german word and true false for right wrong

export const mainReducer = (state = initialState, action) => {
  if (action.type === SET_ANSWER) {
    return Object.assign({}, state, {
      answer: action.userInput
    })
  }
  else if (action.type === GET_QUESTION_SUCCESS) {
    return Object.assign({}, state, {
      currentWord: action.question
    })
  }

  else if (action.type === REVEAL_ANSWER) {
    return Object.assign({}, state, {
      correctAnswer: action.correctAnswer,
      answer: ''
    })
  }

  else if (action.type === RESET_ANSWER_STATUS) {
    return Object.assign({}, state, {
      correctAnswer: null
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
      scores: [...action.scores]
    })
  }
  else if (action.type === GET_LANGUAGES_SUCCESS) {
    return Object.assign({}, state, {
      availableLanguages: [...action.availableLanguages]
    })
  }

  else if (action.type === SET_CURRENT_LANGUAGE) {
    return Object.assign({}, state, {
      currentLanguage: action.language
    })
  }

  return state
}