import { makeError } from '../../utils'
import { isObject } from '../utils'

export type TransformInitialState<State> = (s: any) => State
export interface IGetFormattedInitialState<State> {
  initialState: any
  transformInitialState?: TransformInitialState<State>
  topLevel: boolean
  defaultState: State
}

export const getFormattedInitialState = <State>(params: IGetFormattedInitialState<State>) => {
  const {
    initialState,
    transformInitialState = (((s) => s) as TransformInitialState<State>),
    topLevel,
    defaultState,
  } = params

  const formattedInitialState = initialState !== undefined ?
      transformInitialState(initialState) : defaultState

  if (!isObject(formattedInitialState) && topLevel) {
    throw makeError('This Definition cannot be used at the reducer top level. Redux reducers do not support entire state being this state value.')
  }

  return formattedInitialState
}