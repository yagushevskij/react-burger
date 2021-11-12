import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '../protected-route'
import ErrorBoundary from '../error-boundary/error-boundary.js'
import { Home, Login, Register } from '../../pages'
import AppHeader from '../app-header/app-header'

const App = () => {
  return (
    <ErrorBoundary>
      <AppHeader />
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App
