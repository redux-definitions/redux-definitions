import { buildModels } from './buildModels'
import { Actions, Models, Reducers, Selectors } from './storage'

export const createReducers = (schema: any) => {
  const localModels: any = {}
  const localReducers: any = {}
  const localActions: any = {}
  const localSelectors: any = {}

  buildModels(schema).forEach((model: any) => {
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
    ...localModels,
    actions: localActions,
    reducers: localReducers,
    selectors: localSelectors,
  }
}
