import { Action } from 'redux-actions'
import { createDefinition } from 'state/createDefinition'
import { isObject, pick } from 'lodash'
import { logWarning } from 'utils'

type State = {}

export default createDefinition({
  reducers: {
    clear: (): State => ({}),
    set: (state: State, { payload = {} }: Action<{}>): State => payload,
    update: (state: State, { payload = {} }: Action<{}>): State => {
      return {
        ...state,
        ...payload
      }
    },
  },
  defaultState: {},
  selectors: {
    get: (state: State, keys: string|string[]|undefined = undefined): any => {
      if (keys) {
        if (isObject(state)) {
          return pick(state, keys)
        }
        logWarning('Map state invalid, `get` returning undefined.')
        return undefined
      }
      return state
    },
    keys: (state: State) => Object.keys(state),
  },
})

