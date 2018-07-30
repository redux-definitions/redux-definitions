import { IReducerMap, Reducer } from './reducer'
import { ISelectorMap, IMappedSelectorMap } from './selector'
import { IModelDefinition } from './model'

export interface IInvokeDefinitionOptions {
    initialState?: any
    [name: string]: any
  }
  
export type ReducerMapOrConstructor<LocalState> = IReducerMap<LocalState>|ReducerMapConstructor<LocalState>
export type ReducerMapConstructor<LocalState> = (options: IInvokeDefinitionOptions) => IReducerMap<LocalState>

export interface ICreateDefinition<LocalState, Selectors extends ISelectorMap<LocalState>> {
  reducers: ReducerMapOrConstructor<LocalState>
  selectors: IMappedSelectorMap<LocalState, Selectors>
  defaultState: LocalState
  transformInitialState?: (initialState: any) => LocalState
}

export interface IDefinitionReducerMap<LocalState> {
  [name: string]: Reducer<LocalState>
}

export type DefinitionGenerator<LocalState, Selectors extends ISelectorMap<LocalState>> = (namespacing: string[], topLevel: boolean) => IModelDefinition<LocalState, Selectors>

export interface ICompiledDefinition<LocalState, Selectors extends ISelectorMap<LocalState>> {
  generate: DefinitionGenerator<LocalState, Selectors>
}

export type ReducerDefinition<LocalState, Selectors extends ISelectorMap<LocalState>> = (options?: IInvokeDefinitionOptions) => ICompiledDefinition<LocalState, Selectors>