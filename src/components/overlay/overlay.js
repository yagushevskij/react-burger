import styles from './overlay.module.css'
import PropTypes from 'prop-types'

const Overlay = props => {
  const { onClose } = props
  return <div className={styles.overlay} onClick={onClose}></div>
}

Overlay.propTypes = {
  onClose: PropTypes.func
}

export default Overlay
