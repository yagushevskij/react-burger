export const SET_CURRENT_MODAL = 'SET_CURRENT_MODAL'
export const SET_WAS_CLOSED_FLAG = 'SET_WAS_CLOSED_FLAG'

export const openModal = ({ title, name }) => {
  return {
    type: SET_CURRENT_MODAL,
    payload: { name, title }
  }
}
