/* eslint-disable */

import Normalized from 'nrmlzd'
import { createAction, handleActions } from 'redux-actions'
import {
  generateTypeMap,
  generateReducerMap,
} from './generators'

const Reducers = {}
const Models = {}

const createModel = (
  namespace,
  initialState,
  schema,
  customReducers,
  actionlessReducers,
) => {
  let {
    actions,
    reducers,
  } = generateTypeMap(schema, namespace)

  let {
    actions: customActions,
    reducers: namespacedCustomReducers,
  } = generateReducerMap(customReducers, namespace)

  reducers = {
    ...reducers,
    ...namespacedCustomReducers,
    ...actionlessReducers,
  }

  actions = {
    ...actions,
    ...customActions,
  }

  const reducer = handleActions(reducers, initialState)

  const model = {
    reducer,
    actions,
    selectors: {},
  }

  Reducers[namespace] = reducer
  Models[namespace] = model

  return model
}

const reducers = Reducers

export {
  reducers,
  createModel,
  Models,
}
