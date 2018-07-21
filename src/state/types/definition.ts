import { IReducerMap, Reducer } from './reducer'
import { ISelectorMap } from './selector'
import { IModelDefinition } from './model'

export interface IDefinitionOptions {
    initialState?: any
    [name: string]: any
  }
  
  export type ReducerMapOrConstructor<LocalState> = IReducerMap<LocalState>|ReducerMapConstructor<LocalState>
  export type ReducerMapConstructor<LocalState> = (options: IDefinitionOptions) => IReducerMap<LocalState>
  
  export interface IDefinition<LocalState> {
    reducers: ReducerMapOrConstructor<LocalState>
    selectors: ISelectorMap<LocalState>
    defaultState: LocalState
    transformInitialState?: (initialState: any) => LocalState
  }
  
  export interface IDefinitionReducerMap<State> {
    [name: string]: Reducer<State>
  }
  
  export interface IReducerDefinition {
    generate: (namespacing: string[], topLevel?: boolean) => IModelDefinition
  }