import { forIn } from 'lodash/object'
import { createState } from './state'
import { attachStateModelsToConsole } from './console'
import StateTypes from './state/types'

const Actions = {}
const Models = {}
const Reducers = {}
const reducers = Reducers
const Selectors = {}

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

const clearAllState = () => {
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

const startRepl = (store) => {
  if ((process && process.title === 'browser') || isTest) {
    const w = isTest ? global : window

    if (!store || !store.dispatch || !store.getState) {
      throw Error('Redux Enterprise: `startRepl` requires a valid store object')
    }

    w.store = store
    attachStateModelsToConsole(Models, w)

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
  Models,
  Reducers,
  reducers, // backwards compatible
  Actions,
  Selectors,
  StateTypes,
}

export {
  defineState,
  startRepl,
  clearAllState,
  Models,
  Reducers,
  reducers, // backwards compatible
  Actions,
  Selectors,
  StateTypes,
}
