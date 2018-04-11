/* eslint-disable */
// Setable
import { createAction } from 'redux-actions'
import { scopeReductionFactory } from './utils'

const generate = (namespacing) => {
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
    return {
      ...state,
      [field]: payload,
    }
  })

  reducers[getType('unset')] = scopeReduction((state) => {
    return {
      ...state,
      [field]: null,
    }
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
