import styles from './loader.module.css'
import Overlay from '../overlay/overlay'
import PropTypes from 'prop-types'
import React from 'react'

const Loader = ({ title }) => {
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

Loader.propTypes = {
  title: PropTypes.string
}

export default React.memo(Loader)
