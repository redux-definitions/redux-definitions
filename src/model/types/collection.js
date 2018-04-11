/* eslint-disable */
// Collection
import { createAction } from 'redux-actions'
import Normalized from 'nrmlzd'
import { scopeReductionFactory } from './utils'

const generate = (namespacing) => {
  const namespace = namespacing.join('/')
  const field = namespacing[namespacing.length - 1]
  const getType = (type) => `${namespace}/${type}`
  const scopeReduction = scopeReductionFactory(namespacing)
  const reducers = {}

  const actions = {
    set: createAction(getType('set')),
    reset: createAction(getType('reset')),
    upsert: createAction(getType('upsert')),
    remove: createAction(getType('remove')),
  }

  reducers[getType('set')] = scopeReduction((state, { payload }) => {
    return {
      ...state,
      [field]: Normalized.fromArray(payload),
    }
  })

  reducers[getType('reset')] = scopeReduction((state) => {
    return {
      ...state,
      [field]: Normalized.create(),
    }
  })

  reducers[getType('upsert')] = scopeReduction((state, { payload }) => {
    return {
      ...state,
      [field]: Normalized.upsert(state[field], payload),
    }
  })

  reducers[getType('remove')] = scopeReduction((state, { payload: id }) => {
    return {
      ...state,
      [field]: Normalized.remove(state[field], id),
    }
  })

  return {
    actions,
    reducers,
    initialState: Normalized.create(),
  }
}

export default {
  generate
}
