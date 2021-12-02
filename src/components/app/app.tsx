import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import ProtectedRoute from '../protected-route'
import ErrorBoundary from '../error-boundary/error-boundary.js'
import { Home, Login, Register, ForgotPassword, ResetPassword, Profile, NotFound } from '../../pages'
import AppHeader from '../app-header/app-header'
import { useDispatch } from 'react-redux'
import { useEffect, useCallback } from 'react'
import { getUser } from '../../services/actions/thunk/user'
import { getItems } from '../../services/actions/thunk/ingredients'
import { getOrders } from '../../services/actions/thunk/order'
import Logout from '../logout/logout'
import ProtectedAuthRoute from '../protected-auth-route'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import useAppSelector from '../../services/customHooks/useAppSelector'

const WrappedRoutes = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state?.background

  const back = useCallback(
    event => {
      event.stopPropagation()
      navigate(-1)
    },
    [navigate]
  )

  return (
    <>
      <Routes location={background ?? location}>
        <Route path='/' element={<Home />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/profile' element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<Profile />} />
        </Route>
        <Route path='/logout' element={<ProtectedRoute />}>
          <Route path='/logout' element={<Logout />} />
        </Route>
        <Route path='/' element={<ProtectedAuthRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Routes>
        {background && (
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингридиента' handleClose={back}>
                <IngredientDetails />
              </Modal>
            }
          />
        )}
        <Route path='*' element={null} />
      </Routes>
    </>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const orderNumber = useAppSelector(state => state.order.number)

  useEffect(() => {
    dispatch(getUser())
    dispatch(getItems())
    dispatch(getOrders())
  }, [dispatch])

  useEffect(() => {
    if (orderNumber) {
      dispatch(getOrders())
      dispatch(getItems())
    }
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
