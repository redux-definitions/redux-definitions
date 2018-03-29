/* eslint-disable */
// Setable
import { createAction } from 'redux-actions'

const generate = (namespace, field, actions, reducerFns) => {
  const getType = (type) => `${namespace}/${field}/${type}`

  actions[field] = {
    set: createAction(getType('set')),
    unset: createAction(getType('unset')),
  }

  reducerFns[getType('set')] = (state, { payload }) => {
    return {
      ...state,
      [field]: payload,
    }
  }

  reducerFns[getType('unset')] = (state) => {
    return {
      ...state,
      [field]: null,
    }
  }
}

export default {
  generate
}
