import { createDefinition } from './createDefinition'
import { logWarning } from 'utils'

const generateFactory = ({ initialState = false }) => createDefinition({
  set: (state, action) => {
    const val = ('payload' in action) ? action.payload : true

    if (typeof val !== 'boolean') {
      logWarning(`\`${namespace}\` is being set with a non boolean value! Casting type.`) // eslint-disable-line
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
