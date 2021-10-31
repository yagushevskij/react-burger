import modalOverlay from './modal-overlay.module.css'
import PropTypes from 'prop-types'

const ModalOverlay = props => {
  const { onClose } = props
  return <div className={modalOverlay.overlay} onClick={onClose}></div>
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default ModalOverlay
