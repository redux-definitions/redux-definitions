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

export interface IModelDefinition<LocalState> {
  kind: 'definition'
  actions: IActionCreatorMap
  initialState: {}
  reducers: IReducerMap<{}>
  selectors: ISelectorMap<LocalState>
}

export interface IModelFunction {
  kind: 'function'
  action: ActionCreator
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

export interface IMappedModel<ReducerSchema> {
  namespace: string
  actions: IMappedActionCreatorMaps<ReducerSchema>
  reducer: Reducer<{}>
  selectors: IMappedSelectorMaps<ReducerSchema>
}

export type IMappedModelMap<Schema> = {
  [Key in keyof Schema]: IMappedModel<Schema[Key]>
}