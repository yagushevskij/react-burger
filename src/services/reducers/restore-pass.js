import { RESTORE_PASS_REQUEST, RESTORE_PASS_REQUEST_SUCCESS, RESTORE_PASS_REQUEST_FAILED, SET_INIT_STATE_RESTORE_PASS } from '../actions/restore-pass.js'

const initialState = {
  request: false,
  failed: false,
  success: false,
  errorMessage: null
}

const restorePassReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESTORE_PASS_REQUEST:
      return {
        ...initialState,
        request: true
      }
    case RESTORE_PASS_REQUEST_SUCCESS:
      return {
        ...state,
        request: false,
        success: true
      }
    case RESTORE_PASS_REQUEST_FAILED:
      return {
        ...initialState,
        failed: true,
        errorMessage: action.payload.errorMessage
      }
      case SET_INIT_STATE_RESTORE_PASS:
        return {
          ...initialState
        }
    default:
      return state
  }
}

export default restorePassReducer
