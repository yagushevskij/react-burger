import { SET_WAS_CLOSED_FLAG, OPEN_MODAL, CLOSE_MODAL } from '../actions/modal'

const initialState = {
  isOpened: false,
  wasClosed: false,
  title: null
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return { ...state, isOpened: true, wasClosed: false, title: action.payload.title }
    }
    case CLOSE_MODAL: {
      return { ...initialState, isOpened: false, wasClosed: true }
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
