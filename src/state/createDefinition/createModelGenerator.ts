import { get } from 'lodash'
import { Action, Reducer } from 'redux-actions'
import { makeError } from 'utils'
import { IModelDefinition } from 'state/traverse/types'
import { makeScope } from 'state/algorithms/makeScope'
import { getActionType } from 'state/utils'
import { isFunction, isObject } from 'state/utils'

export interface IOptions {
  initialState?: any
  [name: string]: any
}

export interface IDefinitionReducerMap<State> {
  [name: string]: Reducer<State, any>
}

export type ReturnDefinitionReducerMap<State> = (options: IOptions) => IDefinitionReducerMap<State>
export type DefinitionReducerMap<State> = IDefinitionReducerMap<State>|ReturnDefinitionReducerMap<State>

export interface ICreateModelGenerator<State> {
  options: IOptions
  defaultState: State
  reducerFns: DefinitionReducerMap<State>
  selectorFns: any
  transformInitialState: any
}

export const createModelGenerator =
  <State>(params: ICreateModelGenerator<State>) =>
  (namespacing: string[], topLevel: boolean): IModelDefinition => {
  const {
    options,
    defaultState,
    reducerFns,
    selectorFns,
    transformInitialState,
  } = params

  const formattedInitialState = getFormattedInitialState<State>({
    initialState: options.initialState,
    defaultState,
    transformInitialState,
    topLevel,
  })

  const model: IModelDefinition = {
    kind: 'definition',
    actions: {},
    initialState: formattedInitialState,
    reducers: {},
    selectors: {},
  }

  const actionFnsObject: IDefinitionReducerMap<State> =
    isFunction(reducerFns) ? reducerFns(options) : reducerFns

  type ReducerFnsTuple = [string, Reducer<State, any>]
  const scope = makeScope(namespacing)
  for (const [key, fn] of Object.entries(actionFnsObject) as ReducerFnsTuple[]) {
    const type = getActionType(namespacing, key)
    const { reducer, action } = scope(type, fn)
    model.reducers[type] = reducer
    model.actions[key] = action
  }

  type SelectorTuple = [string, (state: {}, args: any) => any]
  for (const [key, fn] of Object.entries(selectorFns) as SelectorTuple[]) {
    model.selectors[key] = (state: any, args: any) =>
      fn(get(state, namespacing), args)
  }

  return model
}

type TransformInitialState<State> = (s: any) => State
interface IGetFormattedInitialState<State> {
  initialState: any
  transformInitialState?: TransformInitialState<State>
  topLevel: boolean
  defaultState: State
}

const getFormattedInitialState = <State>(params: IGetFormattedInitialState<State>) => {
  const {
    initialState,
    transformInitialState = (((s) => s) as TransformInitialState<State>),
    topLevel,
    defaultState,
  } = params

  const formattedInitialState = initialState ?
      transformInitialState(initialState) : defaultState

  if (!isObject(formattedInitialState) && topLevel) {
    throw makeError('This Definition cannot be used at the reducer top level. Redux reducers do not support entire state being this state value.')
  }

  return formattedInitialState
}