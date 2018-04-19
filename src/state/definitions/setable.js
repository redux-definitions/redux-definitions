/* eslint-disable */
// Setable
import { createAction } from 'redux-actions'
import { scopeReductionFactory } from './utils'

const generate = (namespacing, topLevel) => {
  if (topLevel) {
    throw Error('Redux Enterprise: State Definition `Setable` cannot be used at the reducer top level. Redux reducers do not support entire state being a boolean value.')
  }

  const namespace = namespacing.join('/')
  const field = namespacing[namespacing.length - 1]
  const getType = (type) => `${namespace}/${type}`
  const scopeReduction = scopeReductionFactory(namespacing)
  const reducers = {}

  const actions = {
    set: createAction(getType('set')),
    unset: createAction(getType('unset')),
  }

  reducers[getType('set')] = scopeReduction((state, { payload }) => {
    return payload
  })

  reducers[getType('unset')] = scopeReduction((state) => {
    return null
  })

  return {
    actions,
    reducers,
    initialState: undefined,
  }
}

export default {
  generate
}
