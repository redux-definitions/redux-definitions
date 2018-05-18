import Normalized from 'nrmlzd'
import { makeError, logWarning } from 'utils'
import { createStateType } from 'state/createStateType'

const isValidItem = (o) => typeof o === 'object' && o.id

const check = (o) => {
  if (!isValidItem(o)) {
    throw makeError('Collection - Item has no `id` key')
  }
  return o
}

const checkAll = (list) => list.map(check)

export default createStateType({
  defaultState: Normalized.create(),
  actions: {
    set: (_, { payload }) => Normalized.fromArray(checkAll(payload)),
    reset: () => Normalized.create(),
    create: (state, { payload }) => Normalized.upsert(state, check(payload)),
    upsert: (state, { payload }) => Normalized.upsert(state, check(payload)),
    remove: (state, { payload: id }) => Normalized.remove(state, id),
  },
  selectors: {
    get: (state) => state,
    items: (state) => Normalized.toArray(state),
    ids: (state) => state.ids,
    byId: (state, { id }) => state.data[id] || null,
  },
  transformInitialState: (initialState) =>
    Normalized.fromArray(checkAll(initialState)),
})

