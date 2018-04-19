/* eslint-disable */
// Flag
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
    toggle: createAction(getType('toggle')),
  }

  reducers[getType('set')] = scopeReduction((state, action) => {
    const val = ('payload' in action) ? action.payload : true

    if (typeof val !== 'boolean') {
      console.warn(`Redux Enterprise\n\n\`${namespace}\` is being set with a non boolean value! Casting type.\n`)
    }

    return !!val
  })

  reducers[getType('unset')] = scopeReduction((state) => {
    return false
  })

  reducers[getType('toggle')] = scopeReduction((state) => {
    const val = !state[field]
    return val
  })

  return {
    actions,
    reducers,
    initialState: false,
  }
}

export default {
  generate
}
