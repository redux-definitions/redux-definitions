import { update } from 'lodash/object'
import { createAction } from 'redux-actions'

export const createDefinition =
  (updaters, initialState, invalidAtTopLevel) =>
  (namespacing, topLevel) => {
  if (invalidAtTopLevel && topLevel) {
    throw Error('Redux Enterprise: State Definition cannot be used at the reducer top level. Redux reducers do not support entire state being this initialState value.')
  }

  const namespace = namespacing.join('/')
  const getType = (type) => `${namespace}/${type}`
  const scopeReduction = scopeReductionFactory(namespacing)
  const reducers = {}
  const actions = {}

  for (const [key, fn] of Object.entries(updaters)) {
    const type = getType(key)
    actions[key] = createAction(type)
    reducers[type] = scopeReduction(fn)
  }

  return {
    actions,
    reducers,
    initialState,
  }
}

export const scopeReductionFactory = (namespacing) => (fn) => (state, action) => {
  const [_, ...namespacingWithoutRoot] = namespacing
  const nextState = { ...state }

  if (namespacingWithoutRoot.length) {
    return update(
      nextState,
      namespacingWithoutRoot.join('.'),
      (scopedState) => fn(scopedState, action),
    )
  }

  return fn(state, action)
}

