import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '../protected-route'
import ErrorBoundary from '../error-boundary/error-boundary.js'
import { Home, Login } from '../../pages'

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<ProtectedRoute />}>
            <Route element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App
