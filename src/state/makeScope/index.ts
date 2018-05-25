import { update } from 'lodash'
import { Action, createAction } from 'redux-actions'
import { Reducer } from 'state/types/reducer'
import { ActionCreator } from 'state/types/actionCreator'

export interface IReducerAndAction<P> {
  reducer: Reducer<{}>
  action: ActionCreator
}

export const makeScope =
  (namespacing: string[], excludeField?: boolean) =>
  <LocalState, P>(type: string, fn: Reducer<LocalState>): IReducerAndAction<P> => {
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

    return fn(state as any, action)
  }

  return {
    reducer,
    action: createAction(type),
  }
}

