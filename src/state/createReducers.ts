import { buildModels } from './buildModels'
import { Actions, Models, Reducers, Selectors } from './storage'
import { ISchema } from 'state/types/schema'
import { IModelMap, IRootModel, IModel } from 'state/types/model'
import { IReducerMap } from 'state/types/reducer'
import { IRootActionCreatorMaps } from 'state/types/actionCreator'
import { IRootSelectorMaps } from 'state/types/selector'
import { IReducerDefinition } from 'state/types/definition'

export const createReducers = (schema: ISchema): IRootModel<{}> => {
  const localModels: IModelMap<{}> = {}
  const localReducers: IReducerMap<{}> = {}
  const localActions: IRootActionCreatorMaps = {}
  const localSelectors: IRootSelectorMaps<{}> = {}

  buildModels(schema).forEach((model: IModel<{}>) => {
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
