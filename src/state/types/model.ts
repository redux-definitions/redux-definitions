import { IReducerMap, Reducer } from './reducer'
import { IActionCreatorMaps, IActionCreatorMap, ActionCreator } from './actionCreator'
import { ISelectorMaps, ISelectorMap } from './selector'

export interface IIntermediateModel {
  actions: IActionCreatorMaps
  initialState: {}
  reducers: IReducerMap<{}>
  selectors: ISelectorMaps
}

export interface IModelDefinition {
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

export interface IModel {
  namespace: string
  actions: IActionCreatorMaps
  reducer: Reducer<{}>
  selectors: ISelectorMaps
}

export interface IModelMap {
  [key: string]: IModel
}