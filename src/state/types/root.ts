import { IRootActionCreatorMaps, IActionCreatorMap } from 'state/types/actionCreator'
import { IReducerMap } from 'state/types/reducer'
import { IRootSelectorMaps } from 'state/types/selector'
import { IMappedModelMap } from 'state/types/model'

export type IRoot<Schema> = {
  actions: IRootActionCreatorMaps<Schema>
  reducers: IReducerMap<{}>
  selectors: IRootSelectorMaps<Schema>
  models: IMappedModelMap<Schema>
}

export type IGenericActionCreatorMaps = {
  [key: string]: IActionCreatorMap
}

export type IGenericRootActionCreatorMaps = {
  [key: string]: IGenericActionCreatorMaps
}