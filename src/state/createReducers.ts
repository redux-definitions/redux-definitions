import { buildModels } from './buildModels'
import { Actions, Models, Reducers, Selectors } from './storage'
import { IModelMap, IReducerMap, INestedActionCreatorMap, INestedSelectorMap, IRootModel, IModel } from './types'

export const createReducers = (schema: any): IRootModel<{}> => {
  const localModels: IModelMap<{}> = {}
  const localReducers: IReducerMap<{}> = {}
  const localActions: INestedActionCreatorMap = {}
  const localSelectors: INestedSelectorMap<{}> = {}

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
