/* eslint-disable */

import { forIn } from 'lodash/object'
import Normalized from 'nrmlzd'
import { createAction, handleActions } from 'redux-actions'
import {
  generateTypeMap,
  generateReducerMap,
  generateActionsMap,
} from './generate-updaters'

const reducers = {}
const Models = {}

const createModel = (
  namespace,
  initialState,
  schema,
  customUpdaters,
  actionlessUpdaters,
) => {
  let actions = {}
  let reducerFns = {}

  generateTypeMap(schema, namespace, actions, reducerFns)

  // customUpdaters

  reducerFns = {
    ...reducerFns,
    ...generateReducerMap(customUpdaters),
  }

  actions = {
    ...actions,
    ...generateActionsMap(customUpdaters),
  }

  // actionlessUpdaters
  reducerFns = {
    ...reducerFns,
    ...actionlessUpdaters,
  }

  const reducer = handleActions(reducerFns, initialState)

  const model = {
    reducer,
    actions,
    selectors: {},
  }

  reducers[namespace] = reducer
  Models[namespace] = model

  return model
}

export {
  reducers,
  createModel,
  Models,
}
