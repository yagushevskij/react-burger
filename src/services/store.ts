import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { socketMiddleware } from './middlewares/socket-middleware'
import { wsActions } from './actions/orders'


const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
})

export type TRootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(socketMiddleware(wsActions), thunk)))

export default store