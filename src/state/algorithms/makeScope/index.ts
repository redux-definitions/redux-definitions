import { update } from 'lodash'
import { Action, Reducer, createAction } from 'redux-actions'

export const makeScope =
  (namespacing: string[], excludeField?: boolean) =>
  <P>(type: string, fn: Reducer<any, P>) => {
  const reducer = (state: {}, action: Action<P>) => {
    const keyPath = excludeField
      ? namespacing.slice(1, -1)
      : namespacing.slice(1)

    const nextState = { ...state }

    if (keyPath.length) {
      return update(
        nextState,
        keyPath.join('.'),
        (scopedState) => fn(scopedState, action),
      )
    }

    return fn(state, action)
  }

  return {
    reducer,
    action: createAction<P>(type),
  }
}

