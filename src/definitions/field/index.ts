import { Action } from 'redux-actions'
import { createDefinition } from 'state/createDefinition'

type State = any

export default createDefinition({
  reducers: {
    clear: (): State => undefined,
    set: (state: State, { payload }: Action<any>): State => payload,
  },
  defaultState: undefined,
  selectors: {
    get: (state: State) => state,
    isSet: (state: State) => !!state,
  },
})

