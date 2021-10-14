import overlay from './overlay.module.css';
import PropTypes from 'prop-types';

const Overlay = (props) => {
  const { onClose } = props
  return (
    <div className={overlay.overlay} onClick={onClose}>
    </div>
  );
}

Overlay.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default Overlay;