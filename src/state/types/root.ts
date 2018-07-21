import { IRootActionCreatorMaps } from 'state/types/actionCreator'
import { IReducerMap } from 'state/types/reducer'
import { IRootSelectorMaps } from 'state/types/selector'
import { IModelMap } from 'state/types/model'

export interface IRoot {
  actions: IRootActionCreatorMaps
  reducers: IReducerMap<{}>
  selectors: IRootSelectorMaps
  models: IModelMap
}