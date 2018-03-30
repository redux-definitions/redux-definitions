/* eslint-disable */
// Collection
import { createAction } from 'redux-actions'

const generate = (namespace, field) => {
  const getType = (type) => `${namespace}${field}/${type}`

  const actions = {
    set: createAction(getType('set')),
    reset: createAction(getType('reset')),
    upsert: createAction(getType('upsert')),
    remove: createAction(getType('remove')),
  }

  const reducers = {}

  reducers[getType('set')] = (state, { payload }) => {
    return {
      ...state,
      [field]: payload,
    }
  }

  reducers[getType('reset')] = (state) => {
    return {
      ...state,
      [field]: Normalized.create(),
    }
  }

  reducers[getType('upsert')] = (state, { payload }) => {
    return {
      ...state,
      [field]: Normalized.upsert(state[field], payload),
    }
  }

  reducers[getType('remove')] = (state, { payload: id }) => {
    return {
      ...state,
      [field]: Normalized.remove(state[field], id),
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
