import { makeError } from '../../utils'
import { isObject } from '../utils'

export type TransformInitialState<LocalState> = (state: any, params: { namespacing: string[] }) => LocalState
export interface IGetFormattedInitialState<LocalState> {
  initialState: any
  transformInitialState?: TransformInitialState<LocalState>
  topLevel: boolean
  namespacing: string[]
  defaultState: LocalState
}

export const getFormattedInitialState = <LocalState>(params: IGetFormattedInitialState<LocalState>) => {
  const {
    initialState,
    transformInitialState = (((s) => s) as TransformInitialState<LocalState>),
    topLevel,
    namespacing,
    defaultState,
  } = params

  const formattedInitialState = initialState !== undefined ?
      transformInitialState(initialState, { namespacing }) : defaultState

  if (!isObject(formattedInitialState) && topLevel) {
    throw makeError('This Definition cannot be used at the reducer top level. Redux reducers do not support entire state being this state value.')
  }

  return formattedInitialState
}