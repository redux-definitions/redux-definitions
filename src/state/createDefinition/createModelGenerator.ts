import { get } from 'lodash'
import { Reducer } from 'redux-actions'
import { IDefinitionReducerMap, IDefinitionOptions, ReducerMapOrConstructor, Selector, IModelDefinitionLowest } from '../types'
import { makeScope } from '../makeScope'
import { getActionType } from '../utils'
import { getFormattedInitialState } from './initialState'
import { ISelectorMap } from '../types'

export interface ICreateModelGenerator<LocalState> {
  options: IDefinitionOptions
  defaultState: any
  reducerMap: ReducerMapOrConstructor<LocalState>
  selectorMap: ISelectorMap<LocalState>
  transformInitialState?: any
}

export const createModelGenerator =
  <LocalState>(params: ICreateModelGenerator<LocalState>) =>
  (namespacing: string[], topLevel: boolean): IModelDefinitionLowest => {
  const {
    options,
    defaultState,
    reducerMap,
    selectorMap,
    transformInitialState,
  } = params

  const formattedInitialState = getFormattedInitialState<typeof defaultState>({
    initialState: options.initialState,
    defaultState,
    transformInitialState,
    topLevel,
  })

  const model: IModelDefinitionLowest = {
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