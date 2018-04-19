import { createLogger } from 'redux-logger'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { startRepl, reducers } from '../../../src'

export const makeStore = () => {
  const store = createStore(
    combineReducers(reducers),
    {},
    // applyMiddleware(createLogger())
    applyMiddleware()
  )
  return startRepl(store)
}

