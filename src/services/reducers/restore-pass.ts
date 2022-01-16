import { RESTORE_PASS_REQUEST, RESTORE_PASS_REQUEST_SUCCESS, RESTORE_PASS_REQUEST_FAILED, SET_INIT_STATE_RESTORE_PASS } from '../actions/restore-pass'
import { TAppActions } from '../actions'

interface IRestorePassState {
  request: boolean
  failed: boolean
  success: boolean
  errorMessage: null | string | undefined
}

export const initialState: IRestorePassState = {
  request: false,
  failed: false,
  success: false,
  errorMessage: null,
}

const restorePassReducer = (state = initialState, action: TAppActions): IRestorePassState => {
  switch (action.type) {
    case RESTORE_PASS_REQUEST:
      return {
        ...initialState,
        request: true,
      }
    case RESTORE_PASS_REQUEST_SUCCESS:
      return {
        ...state,
        request: false,
        success: true,
      }
    case RESTORE_PASS_REQUEST_FAILED:
      return {
        ...initialState,
        failed: true,
        errorMessage: action.payload?.message,
      }
    case SET_INIT_STATE_RESTORE_PASS:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export default restorePassReducer
