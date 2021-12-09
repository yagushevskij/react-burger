import styles from './loader.module.css'
import Overlay from '../overlay/overlay'
import React, { FC } from 'react'

type TLoaderProps = {
  title?: string
}

const Loader: FC<TLoaderProps> = ({ title }) => {
  return (
    <>
      <Overlay />
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

export default React.memo(Loader)
