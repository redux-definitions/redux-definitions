/* eslint-disable */
// Collection
import { createAction } from 'redux-actions'
import { uniq } from 'lodash/array'
import { scopeReductionFactory } from './utils'
import { createDefinition } from './utils'

const generate = createDefinition({
  set: (state, { payload }) => payload,
  reset: (state) => [],
  add: (state, { payload }) => uniq([...state, payload]),
  remove: (state, { payload }) => uniq([...state, payload]),
}, {
  get: (state) => state,
  includes: (state, { id }) => state.includes(id),
}, [], true)

export default {
  generate
}
