/* eslint-disable */
// ToggleMap
import { createAction } from 'redux-actions'

// REFACTOR
const generate = (namespacing, actions, reducerFns, section) => {
  const namespace = namespacing.join('/')
  const field = namespace[-1]
  const getType = (type) => `${namespace}/${type}`

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
