import { createAction } from 'redux-actions'
import { forIn } from 'lodash/object'
import { scopeReductionFactory } from 'state/scopeReductionFactory'

const isStateType = (i) => i && i.generate

const generateFunction = (fn, namespacing, topLevel) => {
  if (topLevel) {
    throw Error('Redux Enterprise: State Type custom functions cannot be used at the reducer top level.')
  }

  const namespace = namespacing.join('/')

  return {
    action: createAction(namespace),
    reducers: {
      [namespace]: scopeReductionFactory(namespacing, true)(fn),
    },
  }
}

export const generateStateMap = (schema, namespacing) => {
  let allActions = {}
  let allReducers = {}
  let allSelectors = {}
  let allInitialState = {}

  if (isStateType(schema)) {
    const stateType = schema

    const {
      actions,
      reducers,
      selectors,
      initialState,
    } = buildStateType(stateType, namespacing, true)

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
      if (isStateType(value)) {
        const {
          actions,
          reducers,
          selectors,
          initialState,
        } = buildStateType(value, [...namespacing, field])

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

const buildStateType = (stateType, namespacing, topLevel) =>
  stateType.generate(namespacing, topLevel)
