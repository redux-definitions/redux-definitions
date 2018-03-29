/* eslint-disable */
// Collection
import { createAction } from 'redux-actions'

const generate = (namespace, field, actions, reducerFns) => {
  const getType = (type) => `${namespace}/${field}/${type}`

  actions[field] = {
    set: createAction(getType('set')),
    reset: createAction(getType('reset')),
    upsert: createAction(getType('upsert')),
    remove: createAction(getType('remove')),
  }

  reducerFns[getType('set')] = (state, { payload }) => {
    return {
      ...state,
      [field]: payload,
    }
  }

  reducerFns[getType('reset')] = (state) => {
    return {
      ...state,
      [field]: Normalized.create(),
    }
  }

  reducerFns[getType('upsert')] = (state, { payload }) => {
    return {
      ...state,
      [field]: Normalized.upsert(state[field], payload),
    }
  }

  reducerFns[getType('remove')] = (state, { payload: id }) => {
    return {
      ...state,
      [field]: Normalized.remove(state[field], id),
    }
  }
}

export default {
  generate
}
