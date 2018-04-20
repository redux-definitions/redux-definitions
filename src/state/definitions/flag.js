/* eslint-disable */
// Flag
import { createAction } from 'redux-actions'
import { createDefinition } from './utils'

const generate = createDefinition({
  set: (state, action) => {
    const val = ('payload' in action) ? action.payload : true

    if (typeof val !== 'boolean') {
      console.warn(`Redux Enterprise\n\n\`${namespace}\` is being set with a non boolean value! Casting type.\n`)
    }

    return !!val
  },
  unset: (state) => {
    return false
  },
  toggle: (state) => {
    const val = !state[field]
    return val
  },
}, false, true)

export default {
  generate
}
