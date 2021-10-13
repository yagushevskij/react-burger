import overlay from './overlay.module.css';

const Overlay = (props) => {
  const { onClose } = props
  return (
    <div className={overlay.overlay} onClick={onClose}>
    </div>
  );
}

export default Overlay;