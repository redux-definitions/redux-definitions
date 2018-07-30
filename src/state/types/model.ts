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
  IMappedSelectorMap,
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

export interface IModelDefinition<LocalState, Selectors extends ISelectorMap<LocalState>> {
  kind: 'definition'
  actions: IActionCreatorMap
  initialState: {}
  reducers: IReducerMap<{}>
  selectors: IMappedSelectorMap<LocalState, Selectors>
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

export type IModelMap = {
  [key: string]: IModel
}

export type IMappedModel<ReducerSchema> = {
  namespace: string
  actions: IMappedActionCreatorMaps<ReducerSchema>
  reducer: Reducer<{}>
  selectors: IMappedSelectorMaps<ReducerSchema>
}

export type IMappedModelMap<Schema> = {
  [Key in keyof Schema]: IMappedModel<Schema[Key]>
}