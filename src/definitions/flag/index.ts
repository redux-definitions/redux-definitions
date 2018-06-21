import { createDefinition } from 'state/createDefinition'
import { logWarning } from 'utils'
import { Action } from 'redux-actions'

type State = boolean

export default createDefinition<State>({
  reducers: {
    set: (state: State, action: Action<boolean>): State => {
      const val = ('payload' in action) ? action.payload : true

      if (typeof val !== 'boolean') {
        logWarning(`Field being set with a non boolean value! Casting type.`) // eslint-disable-line
      }

      return !!val
    },
    toggle: (state: State): State => !state,
    unset: (state: State): State => false,
  },
  defaultState: false as State,
  selectors: {
    get: (state: State) => state,
  },
})

