/* eslint-disable */

import { createAction, handleActions } from 'redux-actions'
import { generateTypeMap, generateReducerMap } from './generators'

const generateModel = (
  namespace,
  schema,
  // customReducers,
) => {
  const namespacing = [namespace]

  let {
    actions,
    reducers,
    initialState,
  } = generateTypeMap(schema, namespacing)

  // let {
  //   actions: customActions,
  //   reducers: namespacedCustomReducers,
  //   initialState: customInitialState,
  // } = generateReducerMap(customReducers, namespacing)

  reducers = {
    ...reducers,
    // ...namespacedCustomReducers,
  }

  actions = {
    ...actions,
    // ...customActions,
  }

  initialState = {
    ...initialState,
    // ...customInitialState,
  }

  const reducer = handleActions(reducers, initialState)

  const model = {
    namespace,
    reducer,
    actions,
    selectors: {},
  }

  return model
}

export const createModel = (schema) =>
  Object.entries(schema).map(([namespace, reducerSchema]) =>
    generateModel(namespace, reducerSchema)
  )

