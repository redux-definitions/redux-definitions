import { createReducers, startRepl } from 'index'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { Store } from 'redux'
import { createLogger } from 'redux-logger'
import { IActionCreatorMap, ISelectorMap } from 'state/types'


export interface IState {
  [key: string]: any
}

export interface IModel {
  actions: IActionCreatorMap,
  reducers: object,
  selectors: ISelectorMap<IState>,
  [namespace: string]: any
}

export type Return = Store<IState> & IModel

export const makeStoreAndDefineState = (schema: any, repl?: any): Return => {
  const res = createReducers(schema)
  const store: Store<IState> = createStore(
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

