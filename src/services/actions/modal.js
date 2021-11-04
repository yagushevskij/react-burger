export const SET_WAS_CLOSED_FLAG = 'SET_WAS_CLOSED_FLAG'
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL='CLOSE_MODAL'

export const openModal = ({ title }) => {
  return {
    type: OPEN_MODAL,
    payload: { title }
  }
}
