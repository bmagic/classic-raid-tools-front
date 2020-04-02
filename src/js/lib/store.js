import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSaga from 'redux-saga'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import reducer from './reducer'
import rootSaga from './sagas'

const persistConfig = {
  key: 'cfp',
  storage
}

const saga = createSaga()
const logger = createLogger({ diff: true })

const middlewareEnhancer = (() =>
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(saga, logger))
    : applyMiddleware(saga))()

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(
  persistedReducer,
  undefined,
  middlewareEnhancer
)
export const persistor = persistStore(store)

saga.run(rootSaga)
