import styles from './overlay.module.css'
import { FC } from 'react'

type TOverlayProps = {
  onClose?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Overlay: FC<TOverlayProps> = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose}></div>
}

export default Overlay
