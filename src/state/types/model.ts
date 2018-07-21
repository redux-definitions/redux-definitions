import { IReducerMap, Reducer } from './reducer'
import { IRootActionCreatorMaps, IActionCreatorMaps, IActionCreatorMap, ActionCreator } from './actionCreator'
import { IRootSelectorMaps, ISelectorMaps, ISelectorMap } from './selector'

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
  actions: IRootActionCreatorMaps
  reducers: IReducerMap<State>
  selectors: IRootSelectorMaps<State>
  models: IModelMap<State>
}