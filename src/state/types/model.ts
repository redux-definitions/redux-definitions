import { IReducerMap, Reducer } from './reducer'
import {
  IActionCreatorMaps,
  IActionCreatorMap,
  ActionCreator,
  IMappedActionCreatorMaps,
} from './actionCreator'
import {
  ISelectorMaps,
  ISelectorMap,
  IMappedSelectorMaps,
} from './selector'

export interface IMappedIntermediateModel<ReducerSchema> {
  actions: IMappedActionCreatorMaps<ReducerSchema>
  initialState: {}
  reducers: IReducerMap<{}>
  selectors: IMappedSelectorMaps<ReducerSchema>
}

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

export interface IModel<ReducerSchema> {
  namespace: string
  actions: IMappedActionCreatorMaps<ReducerSchema>
  reducer: Reducer<{}>
  selectors: IMappedSelectorMaps<ReducerSchema>
}

export type IModelMap<Schema> = {
  [Key in keyof Schema]: IModel<Schema[Key]>
}