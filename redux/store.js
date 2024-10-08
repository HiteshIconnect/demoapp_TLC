import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import rootReducer from './root-reducer'


// const middlewares = [logger,thunk]
const middlewares = [thunk]


const store = createStore(rootReducer, applyMiddleware(...middlewares))
const persistor = persistStore(store)

export {store,persistor}