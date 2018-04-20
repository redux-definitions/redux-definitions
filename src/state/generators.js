/* eslint-disable */

import { createAction } from 'redux-actions'
import { forIn } from 'lodash/object'

const isStateDefinition = (i) => {
  return typeof i === 'object' && i.generate
}

export const generateTypeMap = (schema, namespacing) => {
  let allActions = {}
  let allReducers = {}
  let allInitialState = {}

  if (isStateDefinition(schema)) {
    const stateDefinition = schema

    const {
      actions,
      reducers,
      initialState,
    } = buildType(stateDefinition, namespacing, true)

    allActions = actions
    allInitialState = initialState
    allReducers = reducers
  } else {
    forIn(schema, (value, field) => {
      if (isStateDefinition(value)) {
        const {
          actions,
          reducers,
          initialState,
        } = buildType(value, [...namespacing, field])

        allActions[field] = actions
        allInitialState[field] = initialState
        allReducers = {
          ...allReducers,
          ...reducers,
        }
      } else if (typeof value === 'object') {
        const {
          actions,
          reducers,
          initialState,
        } = generateTypeMap(value, [...namespacing, field])

        allActions[field] = actions
        allInitialState[field] = initialState
        allReducers = {
          ...allReducers,
          ...reducers,
        }
      } else {
        throw Error(
          `Redux Enterprise: Invalid schema at '${namespacing.join('.')}': ${value}`
        )
      }
    })
  }

  return {
    actions: allActions,
    reducers: allReducers,
    initialState: allInitialState,
  }
}

const buildType = (stateDefinition, namespacing, topLevel) => {
  return stateDefinition.generate(namespacing, topLevel)
}
