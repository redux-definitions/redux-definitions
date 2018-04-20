/* eslint-disable */

import { createAction } from 'redux-actions'
import { forIn } from 'lodash/object'
import { generateFunction } from './definitions/utils'

const isStateDefinition = (i) => {
  return typeof i === 'object' && i.generate
}

export const generateStateMap = (schema, namespacing) => {
  let allActions = {}
  let allReducers = {}
  let allSelectors = {}
  let allInitialState = {}

  if (isStateDefinition(schema)) {
    const stateDefinition = schema

    const {
      actions,
      reducers,
      selectors,
      initialState,
    } = buildStateDefinition(stateDefinition, namespacing, true)

    allActions = actions
    allReducers = reducers
    allSelectors = selectors
    allInitialState = initialState
  } else if (typeof schema === 'function') {
    const {
      action,
      reducers,
    } = generateFunction(schema, namespacing)

    allActions = action
    allReducers = reducers
  } else {
    forIn(schema, (value, field) => {
      if (isStateDefinition(value)) {
        const {
          actions,
          reducers,
          selectors,
          initialState,
        } = buildStateDefinition(value, [...namespacing, field])

        allActions[field] = actions
        allSelectors[field] = selectors
        allInitialState[field] = initialState
        allReducers = {
          ...allReducers,
          ...reducers,
        }
      } else if (typeof value === 'object') {
        const {
          actions,
          reducers,
          selectors,
          initialState,
        } = generateStateMap(value, [...namespacing, field])

        allActions[field] = actions
        allSelectors[field] = selectors
        allInitialState[field] = initialState
        allReducers = {
          ...allReducers,
          ...reducers,
        }
      } else if (typeof value === 'function') {
        const {
          action,
          reducers,
        } = generateFunction(value, [...namespacing, field])

        allActions[field] = action
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
    selectors: allSelectors,
    initialState: allInitialState,
  }
}

const buildStateDefinition = (stateDefinition, namespacing, topLevel) => {
  return stateDefinition.generate(namespacing, topLevel)
}
