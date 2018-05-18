import { makeError } from 'utils'
import { createAction, handleActions } from 'redux-actions'
import { generateStateMap } from './generators'

const buildModel = (namespace, schema) => {
  let {
    actions,
    reducers,
    selectors,
    initialState,
  } = generateStateMap(schema, [namespace])

  const reducer = handleActions(reducers, initialState)

  return {
    namespace,
    reducer,
    actions,
    selectors,
  }
}

export const buildModels = (schema) => {
  if (typeof schema !== 'object') {
    throw makeError('`defineState` must be passed an object as first parameter')
  }

  return Object.entries(schema).map(([namespace, reducerSchema]) =>
    buildModel(namespace, reducerSchema)
  )
}

