import { IRootActionCreatorMaps, IActionCreatorMap } from 'state/types/actionCreator'
import { IReducerMap } from 'state/types/reducer'
import { IRootSelectorMaps } from 'state/types/selector'
import { IModelMap } from 'state/types/model'

export type IRoot<Schema> = {
  actions: IRootActionCreatorMaps<Schema>
  reducers: IReducerMap<{}>
  selectors: IRootSelectorMaps<Schema>
  models: IModelMap<Schema>
}

export type IGenericActionCreatorMaps = {
  [key: string]: IActionCreatorMap
}

export type IGenericRootActionCreatorMaps = {
  [key: string]: IGenericActionCreatorMaps
}

export type IGenericRoot<Schema> = {
  actions: IRootActionCreatorMaps<Schema>
  reducers: IReducerMap<{}>
  selectors: IRootSelectorMaps<Schema>
  models: IModelMap<Schema>
}