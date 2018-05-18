import { forIn } from 'lodash/object'
import { createState } from './createState'

export const Actions = {}
export const Models = {}
export const Reducers = {}
export const reducers = Reducers
export const Selectors = {}

export const defineState = (schema) => {
  const localModels = {}
  const localReducers = {}
  const localActions = {}
  const localSelectors = {}

  createState(schema).forEach(model => {
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

export const clearAllState = () => {
  forIn(Reducers, (_, key) => {
    delete Reducers[key]
  })

  forIn(Models, (_, key) => {
    delete Models[key]
  })

  forIn(Selectors, (_, key) => {
    delete Selectors[key]
  })

  forIn(Actions, (_, key) => {
    delete Actions[key]
  })
}

