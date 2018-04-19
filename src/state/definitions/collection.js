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

  reducers[getType('set')] = scopeReduction((state, { payload }) =>
    Normalized.fromArray(payload)
  )

  reducers[getType('reset')] = scopeReduction((state) =>
    Normalized.create()
  )

  reducers[getType('upsert')] = scopeReduction((state, { payload }) =>
    Normalized.upsert(state, payload)
  )

  reducers[getType('remove')] = scopeReduction((state, { payload: id }) =>
    Normalized.remove(state, id)
  )

  return {
    actions,
    reducers,
    initialState: Normalized.create(),
  }
}

export default {
  generate
}
