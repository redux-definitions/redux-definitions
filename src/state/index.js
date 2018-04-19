/* eslint-disable */

import { createAction, handleActions } from 'redux-actions'
import { generateTypeMap } from './generators'

const generateState = (namespace, schema) => {
  const namespacing = [namespace]

  let {
    actions,
    reducers,
    initialState,
  } = generateTypeMap(schema, namespacing)

  const reducer = handleActions(reducers, initialState)

  const model = {
    namespace,
    reducer,
    actions,
    selectors: {},
  }

  return model
}

export const createState = (schema) =>
  Object.entries(schema).map(([namespace, reducerSchema]) =>
    generateState(namespace, reducerSchema)
  )

