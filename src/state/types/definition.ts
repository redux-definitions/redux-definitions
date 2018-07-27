import { IReducerMap, Reducer } from './reducer'
import { ISelectorMap, IMappedSelectorMap } from './selector'
import { IModelDefinition } from './model'

export interface IInvokeDefinitionOptions {
    initialState?: any
    [name: string]: any
  }
  
export type ReducerMapOrConstructor<LocalState> = IReducerMap<LocalState>|ReducerMapConstructor<LocalState>
export type ReducerMapConstructor<LocalState> = (options: IInvokeDefinitionOptions) => IReducerMap<LocalState>

export interface ICreateDefinition<LocalState, SelectorMap extends ISelectorMap<LocalState>> {
  reducers: ReducerMapOrConstructor<LocalState>
  selectors: IMappedSelectorMap<LocalState, SelectorMap>
  defaultState: LocalState
  transformInitialState?: (initialState: any) => LocalState
}

export interface IDefinitionReducerMap<LocalState> {
  [name: string]: Reducer<LocalState>
}

export type DefinitionGenerator = (namespacing: string[], topLevel: boolean) => IModelDefinition

export interface ICompiledDefinition {
  generate: DefinitionGenerator
}

export type ReducerDefinition = (options: IInvokeDefinitionOptions) => ICompiledDefinition