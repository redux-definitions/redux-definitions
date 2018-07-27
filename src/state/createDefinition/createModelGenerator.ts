import { get } from 'lodash'
import { Reducer } from 'redux-actions'
import { IDefinitionReducerMap, IInvokeDefinitionOptions, ReducerMapOrConstructor, ReducerDefinition, DefinitionGenerator } from 'state/types/definition'
import { IModelDefinition } from 'state/types/model'
import { makeScope } from '../makeScope'
import { getActionType } from '../utils'
import { getFormattedInitialState } from './initialState'
import { Selector, ISelectorMap } from 'state/types/selector'

export interface ICreateModelGenerator<LocalState> {
  options: IInvokeDefinitionOptions
  defaultState: any
  reducerMap: ReducerMapOrConstructor<LocalState>
  selectorMap: ISelectorMap<LocalState>
  transformInitialState?: any
}

export const createModelGenerator =
  <LocalState>(params: ICreateModelGenerator<LocalState>): DefinitionGenerator =>
  (namespacing: string[], topLevel: boolean): IModelDefinition => {
  const {
    options,
    defaultState,
    reducerMap, // TODO: try and map keys in from Definition
    selectorMap, // TODO: try and map keys in from Definition
    transformInitialState,
  } = params

  const formattedInitialState = getFormattedInitialState<typeof defaultState>({
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

  let reducers: IDefinitionReducerMap<LocalState>

  if (typeof reducerMap === 'function') {
    reducers = reducerMap(options)
  } else {
    reducers = reducerMap
  }

  type ReducerTuple = [string, Reducer<LocalState, any>]
  const scope = makeScope(namespacing)
  for (const [key, fn] of Object.entries(reducers) as ReducerTuple[]) {
    const type = getActionType(namespacing, key)
    const { reducer, action } = scope(type, fn)
    model.reducers[type] = reducer
    model.actions[key] = action
  }

  type SelectorTuple = [string, (state: {}, args: any) => any]
  for (const [key, fn] of Object.entries(selectorMap) as SelectorTuple[]) {
    const selector: Selector<{}> = (state: {}, args?: any) =>
      fn(get(state, namespacing), args)
    model.selectors[key] = selector
  }

  return model
}