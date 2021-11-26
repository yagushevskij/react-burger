import ReactDOM from 'react-dom'
import React, { useCallback, useEffect } from 'react'
import modal from './modal.module.css'
import Overlay from '../overlay/overlay'
import PropTypes from 'prop-types'

const modalRoot = document.getElementById('modal-root')

const Modal = ({ title, children, handleClose }) => {

  const closeByEsc = useCallback(
    event => {
      if (event.keyCode === 27) {
        handleClose(event)
      }
    },
    [handleClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc)
    return () => {
      document.removeEventListener('keydown', closeByEsc)
    }
  }, [closeByEsc])
  return ReactDOM.createPortal(
    <>
      <Overlay onClose={(event) => handleClose(event)} />
      <div className={`${modal.modal}  pt-10 pb-15 pl-10 pr-10`}>
        <div className={`${modal.header}`}>
          {title && <h3 className={`${modal.header__title} text text_type_main-large`}>{title}</h3>}
          <div className={modal.header__icon} onClick={(event) => handleClose(event)}>
            <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L9 7.58579L16.2929 0.292893C16.6834 -0.0976311 17.3166 -0.0976311 17.7071 0.292893C18.0976 0.683417 18.0976 1.31658 17.7071 1.70711L10.4142 9L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L9 10.4142L1.70711 17.7071C1.31658 18.0976 0.683417 18.0976 0.292893 17.7071C-0.0976311 17.3166 -0.0976311 16.6834 0.292893 16.2929L7.58579 9L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z'
                fill='#F2F2F3'
              />
            </svg>
          </div>
        </div>
        {children}
      </div>
    </>,
    modalRoot
  )
}

Modal.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  handleClose: PropTypes.func

}

export default React.memo(Modal)
