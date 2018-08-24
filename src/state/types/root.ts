import { IRootActionCreatorMaps, IActionCreatorMap } from './actionCreator'
import { IReducerMap } from './reducer'
import { IRootSelectorMaps } from './selector'
import { IModelMap } from './model'

export interface IRoot {
  actions: IRootActionCreatorMaps
  reducers: IReducerMap<{}>
  selectors: IRootSelectorMaps
  models: IModelMap
}