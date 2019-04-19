import {
  SET_ANSWER,
  GET_QUESTION_SUCCESS,
  RESET_ANSWER_STATUS,
  HANDLE_STREAK_CORRECT,
  HANDLE_STREAK_INCORRECT,
  GET_SCORES_SUCCESS,
  REVEAL_ANSWER,
  SET_CURRENT_SUBJECT,
  GET_AVAILABLE_SUBJECTS_SUCCESS,
  UPDATE_USER_SUBJECTS_SUCCESS,
  EVALUATE_ANSWER_REQUEST,
  EVALUATE_ANSWER_ERROR,
  GET_AVAILABLE_SUBJECTS_REQUEST,
  GET_AVAILABLE_SUBJECTS_ERROR,
  GET_QUESTION_REQUEST,
  GET_QUESTION_ERROR,
  NEXT_QUESTION_REQUEST,
  NEXT_QUESTION_ERROR,
  GET_SCORES_REQUEST,
  GET_SCORES_ERROR,
  UPDATE_USER_SUBJECTS_REQUEST,
  UPDATE_USER_SUBJECTS_ERROR,
  NEW_SUBJECT_LIST_REQUEST,
  NEW_SUBJECT_LIST_ERROR,
  GET_USER_SUBJECTS_SUCCESS,
  GET_USER_SUBJECTS_REQUEST,
  GET_USER_SUBJECTS_ERROR,
  STAGE_NEW_SUBJECT,

} from '../actions/index.js'

import {
  REGISTER_USER_ERROR, REGISTER_USER_REQUEST
} from '../actions/users'



const initialState = {
  //TODO change answer to userAnswer

  answer: '',
  correctAnswer: null,
  currentWord: 'null',
  streak: 0,
  scores: [],
  availableSubjects: [],
  userSubjects: [],
  currentSubject: null,
  loading: false,
  error: null,
  stagedSubject: '',
}


export const mainReducer = (state = initialState, action) => {
  if (action.type === SET_ANSWER) {
    return Object.assign({}, state, {
      answer: action.userInput
    })
  }
  else if (action.type === GET_QUESTION_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
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
      streak: state.streak += 1,
      loading: false
    })
  }

  else if (action.type === HANDLE_STREAK_INCORRECT) {
    return Object.assign({}, state, {
      streak: 0,
      loading: false
    })
  }

  else if (action.type === GET_SCORES_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      scores: [...action.scores]
    })
  }

  else if (action.type === SET_CURRENT_SUBJECT) {

    return Object.assign({}, state, {
      currentSubject: action.subject
    })

  }

  else if (action.type === GET_AVAILABLE_SUBJECTS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      availableSubjects: action.subjects
    })
  }

  else if (action.type === UPDATE_USER_SUBJECTS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      userSubjects: [...action.userSubjects]
    })
  }


  else if (action.type === EVALUATE_ANSWER_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    })
  }
  else if (action.type === EVALUATE_ANSWER_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  }
  else if (action.type === GET_AVAILABLE_SUBJECTS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    })
  }
  else if (action.type === GET_AVAILABLE_SUBJECTS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  }
  else if (action.type === GET_QUESTION_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    })
  }
  else if (action.type === GET_QUESTION_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  }
  else if (action.type === NEXT_QUESTION_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    })
  }
  else if (action.type === NEXT_QUESTION_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  }
  else if (action.type === GET_SCORES_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    })
  }
  else if (action.type === GET_SCORES_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  }
  else if (action.type === UPDATE_USER_SUBJECTS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    })
  }
  else if (action.type === UPDATE_USER_SUBJECTS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  }
  else if (action.type === NEW_SUBJECT_LIST_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    })
  }
  else if (action.type === NEW_SUBJECT_LIST_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  }
  else if (action.type === GET_USER_SUBJECTS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      userSubjects: [...action.userSubjects]
    })
  }
  else if (action.type === GET_USER_SUBJECTS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    })
  }
  else if (action.type === GET_USER_SUBJECTS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  }
  else if (action.type === STAGE_NEW_SUBJECT) {
    return Object.assign({}, state, {
      stagedSubject: action.subjectId
    })
  }
  else if (action.type === REGISTER_USER_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    })
  }
  else if (action.type === REGISTER_USER_REQUEST) {
    return Object.assign({}, state, {
      error: null
    })
  }

  return state
}