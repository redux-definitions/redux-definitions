import { update, get } from 'lodash/object'
import { createAction } from 'redux-actions'

export const createDefinition =
  (updaters, selectorFns, initialState, invalidAtTopLevel) =>
  (namespacing, topLevel) => {
  if (invalidAtTopLevel && topLevel) {
    throw Error('Redux Enterprise: State Definition cannot be used at the reducer top level. Redux reducers do not support entire state being this initialState value.')
  }

  const namespace = namespacing.join('/')
  const getType = (type) => `${namespace}/${type}`
  const scopeReduction = scopeReductionFactory(namespacing)
  const reducers = {}
  const selectors = {}
  const actions = {}

  for (const [key, fn] of Object.entries(updaters)) {
    const type = getType(key)
    actions[key] = createAction(type)
    reducers[type] = scopeReduction(fn)
  }

  for (const [key, fn] of Object.entries(selectorFns)) {
    selectors[key] = (state, params) =>
      fn(get(state, namespacing), params)
  }

  return {
    actions,
    reducers,
    selectors,
    initialState,
  }
}

export const generateFunction = (fn, namespacing, topLevel) => {
  if (topLevel) {
    throw Error('Redux Enterprise: State Definition custom functions cannot be used at the reducer top level.')
  }

  const namespace = namespacing.join('/')

  return {
    action: createAction(namespace),
    reducers: {
      [namespace]: scopeReductionFactory(namespacing, true)(fn),
    },
  }
}

export const scopeReductionFactory =
  (namespacing, excludeField) =>
  (fn) =>
  (state, action) => {
  const keyPath = excludeField
    ? namespacing.slice(1, -1)
    : namespacing.slice(1)

  const nextState = { ...state }

  if (keyPath.length) {
    return update(
      nextState,
      keyPath.join('.'),
      (scopedState) => fn(scopedState, action),
    )
  }

  return fn(state, action)
}

