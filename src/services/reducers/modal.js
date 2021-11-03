import { SET_CURRENT_MODAL, SET_WAS_CLOSED_FLAG } from '../actions/modal'

const initialState = {
  current: null,
  wasClosed: false,
  title: null
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_MODAL: {
      return { ...state, current: action.payload.name, wasClosed: false, title: action.payload.title }
    }
    case SET_WAS_CLOSED_FLAG: {
      return { ...state, wasClosed: true }
    }
    default: {
      return state
    }
  }
}

export default modalReducer
