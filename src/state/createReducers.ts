import { buildModels } from './buildModels'
import { Actions, Models, Reducers, Selectors } from './storage'
import { ISchema } from 'state/types/schema'
import { IRoot } from 'state/types/root'
import { IReducerMap } from 'state/types/reducer'
import { IRootActionCreatorMaps } from 'state/types/actionCreator'
import { IRootSelectorMaps } from 'state/types/selector'
import { IModelMap } from 'state/types/model'

export const createReducers = <Schema extends ISchema>(schema: Schema): IRoot => {
  const localModels: IModelMap = {}
  const localReducers: IReducerMap<{}> = {}
  const localActions: IRootActionCreatorMaps = {}
  const localSelectors: IRootSelectorMaps = {}

  buildModels(schema).forEach((model) => {
    localModels[model.namespace] = model
    localReducers[model.namespace] = model.reducer
    localActions[model.namespace] = model.actions
    localSelectors[model.namespace] = model.selectors

    Models[model.namespace] = model
    Reducers[model.namespace] = model.reducer
    Actions[model.namespace] = model.actions
    Selectors[model.namespace] = model.selectors
  })

  return {
    models: localModels,
    actions: localActions,
    reducers: localReducers,
    selectors: localSelectors,
  }
}