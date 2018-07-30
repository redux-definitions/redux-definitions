import { get } from 'lodash'
import { Reducer } from 'redux-actions'
import { IDefinitionReducerMap, IInvokeDefinitionOptions, ReducerMapOrConstructor, ReducerDefinition, DefinitionGenerator } from 'state/types/definition'
import { IModelDefinition } from 'state/types/model'
import { makeScope } from '../makeScope'
import { getActionType } from '../utils'
import { getFormattedInitialState } from './initialState'
import { Selector, ISelectorMap, IMappedSelectorMap } from 'state/types/selector'

export interface ICreateModelGenerator<LocalState, Selectors extends ISelectorMap<LocalState>> {
  options: IInvokeDefinitionOptions
  defaultState: any
  reducerMap: ReducerMapOrConstructor<LocalState>
  selectorMap: IMappedSelectorMap<LocalState, Selectors>
  transformInitialState?: any
}

export const createModelGenerator =
  <LocalState, Selectors extends ISelectorMap<LocalState>>(params: ICreateModelGenerator<LocalState, Selectors>): DefinitionGenerator<LocalState, Selectors> =>
  (namespacing: string[], topLevel: boolean): IModelDefinition<LocalState, Selectors> => {
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

  type SelectorTuple = [string, Selector<LocalState>]
  
  const selectors = Object.entries(selectorMap).reduce((acc, [key, fn]:  SelectorTuple) => {
    const selector: Selector<{}> = (state: {}, args?: any) =>
      fn(get(state, namespacing), args)

    return {
      ...acc,
      [key]: selector
    }
  }, {}) as IMappedSelectorMap<LocalState, Selectors>

  const model: IModelDefinition<LocalState, Selectors> = {
    kind: 'definition',
    actions: {},
    initialState: formattedInitialState,
    reducers: {},
    selectors
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

  return model
}