import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app/app'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './services/reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { socketMiddleware } from './services/middlewares/socket-middleware'
import { wsActions } from './services/actions/orders'

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
})

export type TRootState = ReturnType<typeof rootReducer>
export type TAppDispatch = typeof store.dispatch

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(socketMiddleware(wsActions), thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('app-root'),
)
