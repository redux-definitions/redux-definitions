/* eslint-disable */
// Flag
import { createAction } from 'redux-actions'

const generate = (namespace, field) => {
  const getType = (type) => `${namespace}${field}/${type}`

  const actions = {
    set: createAction(getType('set')),
    unset: createAction(getType('unset')),
    toggle: createAction(getType('toggle')),
  }

  const reducers = {}

  reducers[getType('set')] = (state, action) => {
    const val = ('payload' in action) ? action.payload : true

    if (typeof val !== 'boolean') {
      console.warn(`Redux Enterprise\n\n\`${namespace}.${field}\` is being set with a non boolean value! Casting type.\n`)
    }

    return {
      ...state,
      [field]: !!val
    }
  }

  reducers[getType('unset')] = (state) => {
    return {
      ...state,
      [field]: false,
    }
  }

  reducers[getType('toggle')] = (state) => {
    const val = !state[field]
    return {
      ...state,
      [field]: val,
    }
  }

  return {
    actions,
    reducers,
  }
}

export default {
  generate
}
