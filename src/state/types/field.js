import { createDefinition } from './utils'

const generateFactory = ({ initialState }) => createDefinition({
  set: (state, { payload }) => payload,
  unset: () => null,
}, {
  isSet: (state) => !!state,
  get: (state) => state,
}, initialState, true)

const Type = ({ initialState }) => ({
  generate: generateFactory({ initialState })
})

Type.generate = generateFactory({})

export default Type
