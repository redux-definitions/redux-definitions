import { createDefinition } from './utils'

const generateFactory = ({ initialState = false }) => createDefinition({
  set: (state, action) => {
    const val = ('payload' in action) ? action.payload : true

    if (typeof val !== 'boolean') {
      console.warn(`Redux Enterprise\n\n\`${namespace}\` is being set with a non boolean value! Casting type.\n`) // eslint-disable-line
    }

    return !!val
  },
  unset: () => false,
  toggle: (state) => !state,
}, {
  get: (state) => state,
}, initialState, true)

const Type = ({ initialState }) => ({
  generate: generateFactory({ initialState })
})

Type.generate = generateFactory({})

export default Type
