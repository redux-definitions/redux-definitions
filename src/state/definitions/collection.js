/* eslint-disable */
// Collection
import { createAction } from 'redux-actions'
import Normalized from 'nrmlzd'
import { scopeReductionFactory } from './utils'
import { createDefinition } from './utils'

const generate = createDefinition({
  set: (state, { payload }) => Normalized.fromArray(payload),
  reset: (state) => Normalized.create(),
  create: (state, { payload }) => Normalized.upsert(state, payload),
  upsert: (state, { payload }) => Normalized.upsert(state, payload),
  remove: (state, { payload: id }) => Normalized.remove(state, id),
}, Normalized.create())

export default {
  generate
}
