import { forIn } from 'lodash/object'
import { createState } from './state'
import { attachStateModelsToConsole } from './console'
import StateTypes from './state/types'

const actions = {}
const models = {}
const reducers = {}
const selectors = {}

const isTest = process.env.NODE_ENV === 'test'

const defineState = (schema) => {
  const localModels = {}
  const localReducers = {}
  const localActions = {}
  const localSelectors = {}

  createState(schema).forEach(model => {
    localModels[model.namespace] = model
    localReducers[model.namespace] = model.reducer
    localActions[model.namespace] = model.actions
    localSelectors[model.namespace] = model.selectors

    models[model.namespace] = model
    reducers[model.namespace] = model.reducer
    actions[model.namespace] = model.actions
    selectors[model.namespace] = model.selectors
  })

  return {
    ...localModels,
    reducers: localReducers,
    actions: localActions,
    selectors: localSelectors,
  }
}

const clearAllState = () => {
  forIn(reducers, (_, key) => {
    delete reducers[key]
  })

  forIn(models, (_, key) => {
    delete models[key]
  })
}

const startRepl = (store) => {
  if ((process && process.title === 'browser') || isTest) {
    const w = isTest ? global : window

    if (!store || !store.dispatch || !store.getState) {
      throw Error('Redux Enterprise: `startRepl` requires a valid store object')
    }

    w.store = store
    attachStateModelsToConsole(models, w)

    if (!isTest) {
      console.log('Redux Enterprise: starting REPL') // eslint-disable-line
    }
  }
  return store
}

export default {
  defineState,
  startRepl,
  clearAllState,
  reducers,
  StateTypes,
}

export {
  defineState,
  startRepl,
  clearAllState,
  reducers,
  StateTypes,
}
