/* eslint-disable */

import { createAction, handleActions } from 'redux-actions'
import { generateStateMap } from './generators'

const generateState = (namespace, schema) => {
  const namespacing = [namespace]

  let {
    actions,
    reducers,
    selectors,
    initialState,
  } = generateStateMap(schema, namespacing)

  const reducer = handleActions(reducers, initialState)

  const model = {
    namespace,
    reducer,
    actions,
    selectors,
  }

  return model
}

export const createState = (schema) => {
  if (typeof schema !== 'object') {
    throw Error('Redux Enterprise: defineState must be passed an object as first parameter')
  }

  return Object.entries(schema).map(([namespace, reducerSchema]) =>
    generateState(namespace, reducerSchema)
  )
}

