import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import ProtectedRoute from '../protected-route'
import ErrorBoundary from '../error-boundary/error-boundary'
import { Home, Login, Register, ForgotPassword, ResetPassword, Profile, NotFound, OrdersFeed, OrderUserInfo, OrderAllUsersInfo } from '../../pages'
import AppHeader from '../app-header/app-header'
import { useEffect, useCallback, FC } from 'react'
import { getUser } from '../../services/actions/thunk/user'
import { getItems } from '../../services/actions/thunk/ingredients'
import Logout from '../logout/logout'
import ProtectedAuthRoute from '../protected-auth-route'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { useAppSelector, useAppDispatch } from '../../services/custom-hooks/redux-hooks'
import OrderInfoModal from '../order-info-modal/order-info-modal'

const WrappedRoutes: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state?.background
  const navigationType = useNavigationType()
  const shouldShowPage = navigationType === 'POP' || navigationType === 'REPLACE'
  const shouldShowModal = navigationType === 'PUSH'

  const back = useCallback(
    event => {
      event.stopPropagation()
      navigate(-1)
    },
    [navigate],
  )

  return (
    <>
      <Routes location={background ?? location}>
        <Route path="/" element={<Home />} />
        <Route path="/feed/*" element={<Feed />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="/profile" element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/orders" element={<Profile />} />
          {shouldShowPage && <Route path="/profile/orders/:id" element={<OrderUserInfo />} />}
        </Route>
        <Route path="/logout" element={<ProtectedRoute />}>
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="/" element={<ProtectedAuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Routes>
        {background && (
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингридиента" handleClose={back}>
                <IngredientDetails />
              </Modal>
            }
          />
        )}
        {shouldShowModal && background && <Route path="/profile/orders/:id" element={<OrderInfoModal />} />}
        {shouldShowModal && background && <Route path="/feed/:id" element={<OrderInfoModal />} />}
        <Route path="*" element={null} />
      </Routes>
    </>
  )
}

const Feed: FC = () => {
  return (
    <Routes>
      <Route path=":id" element={<OrderAllUsersInfo />} />
      <Route path="" element={<OrdersFeed />} />
    </Routes>
  )
}

const App: FC = () => {
  const dispatch = useAppDispatch()
  const orderNumber = useAppSelector(state => state.order.number)

  useEffect(() => {
    dispatch(getUser())
    dispatch(getItems())
  }, [dispatch])

  useEffect(() => {
    orderNumber && dispatch(getItems())
  }, [dispatch, orderNumber])

  return (
    <ErrorBoundary>
      <Router>
        <AppHeader />
        <WrappedRoutes />
      </Router>
    </ErrorBoundary>
  )
}

export default App
