import ReactDOM from 'react-dom'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import modal from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { openModal, SET_WAS_CLOSED_FLAG } from '../../services/actions/modal'
import OrderDetails from '../order-details/order-details'
import IngredientDetails from '../ingredient-details/ingredient-details'

const modalRoot = document.getElementById('modal-root')

const Modal = () => {
  const dispatch = useDispatch()
  const currentModal = useSelector(state => state.modal.current)
  const title = useSelector(state => state.modal.title)

  const close = useCallback(
  () => {
    dispatch(openModal({ name: null }))
    dispatch({
      type: SET_WAS_CLOSED_FLAG
    })
  }, [dispatch])
  const closeByEsc = useCallback(
    e => {
      if (e.keyCode === 27) {
        close()
      }
    },
    [close]
  )

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc)
    return () => {
      document.removeEventListener('keydown', closeByEsc)
    }
  }, [closeByEsc])
  return ReactDOM.createPortal(
    currentModal && (
      <>
        <ModalOverlay onClose={close} />
        <div className={`${modal.modal}  pt-10 pb-15 pl-10 pr-10`}>
          <div className={`${modal.header}`}>
            {title && <h3 className={`${modal.header__title} text text_type_main-large`}>{title}</h3>}
            <div className={modal.header__icon} onClick={close}>
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
          { currentModal === 'orderDetails' && <OrderDetails/>}
          { currentModal === 'ingredientDetails' && <IngredientDetails />}
        </div>
      </>
    ),
    modalRoot
  )
}

export default Modal
