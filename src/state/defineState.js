import { buildModels } from './buildModels'
import { Actions, Models, Selectors, Reducers } from './storage'

export const defineState = (schema) => {
  const localModels = {}
  const localReducers = {}
  const localActions = {}
  const localSelectors = {}

  buildModels(schema).forEach(model => {
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
    reducers: localReducers,
    actions: localActions,
    selectors: localSelectors,
  }
}
