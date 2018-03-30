/* eslint-disable */
// ToggleMap
import { createAction } from 'redux-actions'

// REFACTOR
const generate = (namespace, field, actions, reducerFns, section) => {
  const getType = (type) => `${namespace}${field}/${type}`

  if (section && !actions[section]) {
    actions[section] = {}
  }

  actions[section][field] = {
    toggle: createAction(getType('toggle')),
  }

  const reducer = (state, { payload }) => {
    const map = state[field]
    const val = !map[payload]
    return {
      ...state,
      [field]: {
        ...map,
        [payload]: val,
      },
    }
  }

  reducers[getType('toggle')] = section
    ? (state, action) => ({
        ...state,
        [section]: reducer(state[section], action)
      })
    : reducer
}

export default {
  generate
}
