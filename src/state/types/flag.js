import { createStateType } from 'state/createStateType'
import { logWarning } from 'utils'

export default createStateType({
  defaultState: false,
  actions: {
    set: (state, action) => {
      const val = ('payload' in action) ? action.payload : true

      if (typeof val !== 'boolean') {
        logWarning(`\`${namespace}\` is being set with a non boolean value! Casting type.`) // eslint-disable-line
      }

      return !!val
    },
    unset: () => false,
    toggle: (state) => !state,
  },
  selectors: {
    get: (state) => state,
  },
  invalidAtTopLevel: true,
})

