import { createReducers, startRepl } from '../index'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { Store } from 'redux'
import { createLogger } from 'redux-logger'
import { IModelMap } from '../state/types/model'
import { ISchema } from 'state/types/schema'

export interface IReturn {
  store: Store<{}>
  models: IModelMap
}

export const makeStoreAndDefineState = <Schema extends ISchema>(schema: Schema, repl?: any): IReturn => {
  const rootModel = createReducers(schema)
  const store: Store<{}> = createStore(
    combineReducers(rootModel.reducers),
    {},
    // applyMiddleware(createLogger())
    applyMiddleware()
  )

  if (repl) {
    startRepl(store)
  }

  return {
    store,
    models: rootModel.models
  }
}

