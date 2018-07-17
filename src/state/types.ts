import { Action, ActionFunction1, Reducer as BaseReducer } from 'redux-actions'

// reducers 
export type Reducer<State> = BaseReducer<State, any>

export interface IReducerMap<State> {
  [name: string]: Reducer<State>
}

// action creators
export type ActionCreator<Payload> = ActionFunction1<Payload, Action<Payload>> 

export interface IActionCreatorMap {
  [name: string]: ActionCreator<any>
}

export interface IActionCreatorMaps {
  [name: string]: IActionCreatorMap
}

export interface IRootActionCreatorMaps {
  [name: string]: IActionCreatorMaps
}

// selectors
export type Selector<State> = (state: State, params?: any) => any

export interface ISelectorMap<State> {
  [name: string]: Selector<State>
}

export interface ISelectorMaps<State> {
  [name: string]: ISelectorMap<State>
}

export interface ISelectorMapsGroup<State> {
  [name: string]: ISelectorMaps<State>
}

// Model structures

export interface ITopModel {
  actions: IActionCreatorMaps
  initialState: {}
  reducers: IReducerMap<{}>
  selectors: ISelectorMaps<{}>
}

export interface IModelDefinition {
  kind: 'definition'
  actions: IActionCreatorMap
  initialState: {}
  reducers: IReducerMap<{}>
  selectors: ISelectorMap<{}>
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
  actions: IActionCreatorMaps
  reducer: Reducer<State>
  selectors: ISelectorMaps<State>
}

export interface IModelMap<State> {
  [key: string]: IModel<{}>
}

export interface IRootModel<State> {
  actions: IActionCreatorMapsGroup
  reducers: IReducerMap<State>
  selectors: ISelectorMapsGroup<State>
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