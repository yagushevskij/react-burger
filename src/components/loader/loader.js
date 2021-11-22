import styles from './loader.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import PropTypes from 'prop-types'

const Loader = ({ title }) => {
  return (
    <>
      <ModalOverlay />
      <div className={styles.container}>
        {title && <span className={`text text_type_main-medium`}>{title}</span>}
        <div className={styles.lds_ellipsis}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  )
}

Loader.propTypes = {
  title: PropTypes.string
}

export default Loader
