import { Action, ActionFunction1, Reducer as BaseReducer } from 'redux-actions'

export type ActionCreator<Payload> = ActionFunction1<Payload, Action<Payload>> 
export type Selector<State> = (state: State, params?: any) => any
export type Reducer<State> = BaseReducer<State, any>

export interface IActionCreatorMap {
  [name: string]: ActionCreator<any>
}

export interface INestedActionCreatorMap {
  [name: string]: ActionCreator<any> | INestedActionCreatorMap
}

export interface IReducerMap<State> {
  [name: string]: Reducer<State>
}

export interface ISelectorMap<State> {
  [name: string]: Selector<State>
}

export interface INestedSelectorMap<State> {
  [name: string]: Selector<State> | INestedSelectorMap<State>
}

// Model structures

export interface IModelDefinition {
  kind: 'definition'
  actions: INestedActionCreatorMap
  initialState: {}
  reducers: IReducerMap<{}>
  selectors: INestedSelectorMap<{}>
}

export interface IModelDefinitionLowest {
  kind: 'definition'
  actions: IActionCreatorMap
  initialState: {}
  reducers: IReducerMap<{}>
  selectors: ISelectorMap<{}>
}

export interface IModelFunction {
  kind: 'function'
  action: ActionCreator<any>
  reducers: IReducerMap<{}>
}

export interface IModel<State> {
  namespace: string
  actions: INestedActionCreatorMap
  reducer: Reducer<State>
  selectors: INestedSelectorMap<State>
}

export interface IModelMap<State> {
  [key: string]: IModel<{}>
}

export interface IRootModel<State> {
  actions: INestedActionCreatorMap
  reducers: IReducerMap<State>
  selectors: INestedSelectorMap<State>
  models: IModelMap<State>
}

// Definition types

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