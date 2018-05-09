import Normalized from 'nrmlzd'
import { createDefinition } from './utils'

const generateFactory = ({
  initialState = Normalized.create()
}) => createDefinition({
  set: (_, { payload }) => Normalized.fromArray(payload),
  reset: () => Normalized.create(),
  create: (state, { payload }) => Normalized.upsert(state, payload),
  upsert: (state, { payload }) => Normalized.upsert(state, payload),
  remove: (state, { payload: id }) => Normalized.remove(state, id),
}, {
  get: (state) => state,
  items: (state) => Normalized.toArray(state),
  ids: (state) => state.ids,
  byId: (state, { id }) => state.data[id] || null,
}, initialState)

const Type = ({ initialState }) => ({
  generate: generateFactory({ initialState })
})

Type.generate = generateFactory({})

export default Type
