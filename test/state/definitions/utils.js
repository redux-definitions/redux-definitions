import { createLogger } from 'redux-logger'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { defineState, startRepl } from '../../../src'

export const makeStoreAndDefineState = (schema, repl) => {
  const res = defineState(schema)
  const store = createStore(
    combineReducers(res.reducers),
    {},
    // applyMiddleware(createLogger())
    applyMiddleware()
  )

  if (repl) {
    startRepl(store)
  }

  return {
    ...store,
    ...res
  }
}

