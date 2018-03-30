/* eslint-disable */
// Setable
import { createAction } from 'redux-actions'

const generate = (namespace, field) => {
  const getType = (type) => `${namespace}${field}/${type}`

  const actions = {
    set: createAction(getType('set')),
    unset: createAction(getType('unset')),
  }

  const reducers = {}

  reducers[getType('set')] = (state, { payload }) => {
    return {
      ...state,
      [field]: payload,
    }
  }

  reducers[getType('unset')] = (state) => {
    return {
      ...state,
      [field]: null,
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
