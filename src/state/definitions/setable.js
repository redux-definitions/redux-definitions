/* eslint-disable */
// Setable
import { createAction } from 'redux-actions'
import { createDefinition } from './utils'

const generate = createDefinition({
  set: (state, { payload }) => {
    return payload
  },
  unset: (state) => {
    return null
  }
}, {}, undefined, true)

export default {
  generate
}
