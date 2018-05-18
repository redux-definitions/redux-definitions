import Normalized from 'nrmlzd'
import { makeError, logWarning } from 'utils'
import { createDefinition } from './createDefinition'

const isValidItem = (o) => typeof o === 'object' && o.id

const check = (o) => {
  if (!isValidItem(o)) {
    throw makeError('Collection - Item has no `id` key')
  }
  return o
}

const checkAll = (list) => list.map(check)

const generateFactory = ({
  initialState = []
}) => createDefinition({
  set: (_, { payload }) => Normalized.fromArray(checkAll(payload)),
  reset: () => Normalized.create(),
  create: (state, { payload }) => Normalized.upsert(state, check(payload)),
  upsert: (state, { payload }) => Normalized.upsert(state, check(payload)),
  remove: (state, { payload: id }) => Normalized.remove(state, id),
}, {
  get: (state) => state,
  items: (state) => Normalized.toArray(state),
  ids: (state) => state.ids,
  byId: (state, { id }) => state.data[id] || null,
}, Normalized.fromArray(checkAll(initialState)))

const Type = ({ initialState }) => ({
  generate: generateFactory({ initialState })
})

Type.generate = generateFactory({})

export default Type
