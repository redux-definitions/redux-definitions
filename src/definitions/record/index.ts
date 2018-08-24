import { Action } from 'redux-actions'
import { createDefinition } from 'state/createDefinition'
import { isObject, pick } from 'lodash'
import { logWarning, makeError } from 'utils'

interface IState {
  [key: string]: any
}

export default createDefinition({
  reducers: {
    clear: (): IState => ({}),
    set: (state: IState, { payload = {} }: Action<{}>): IState => payload,
    update: (state: IState, { payload = {} }: Action<{}>): IState => {
      return {
        ...state,
        ...payload
      }
    },
  },
  transformInitialState: (state, { namespacing }) => {
    if (!isObject(state)) {
      throw makeError(`Definition Record at ${namespacing.join('.')} initialState invalid`)
    }
    return state
  },
  defaultState: {},
  selectors: {
    get: (state: IState, keys: string|string[]|undefined = undefined): any => {
      if (keys) {
        if (isObject(state)) {
          return pick(state, keys)
        }
        logWarning('Record state invalid, `get` returning undefined.')
        return undefined
      }
      return state
    },
    keys: (state: IState) => Object.keys(state),
  },
})

