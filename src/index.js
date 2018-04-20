import { forIn } from 'lodash/object'
import { createState } from './state'
import { attachStateModelsToConsole } from './console'
import StateDefinitions from './state/definitions'

const stateModels = {}
const reducers = {}
const selectors = {}

const isTest = process.env.NODE_ENV === 'test'

const defineState = (schema) => {
  const models = {}
  createState(schema).forEach(model => {
    models[model.namespace] = model
    stateModels[model.namespace] = model
    reducers[model.namespace] = model.reducer
    selectors[model.namespace] = model.selectors
  })
  return models
}

const clearAllState = () => {
  forIn(reducers, (_, key) => {
    delete reducers[key]
  })

  forIn(stateModels, (_, key) => {
    delete stateModels[key]
  })
}

const startRepl = (store) => {
  if ((process && process.title === 'browser') || isTest) {
    const w = isTest ? global : window

    if (!store || !store.dispatch) {
      throw Error('Redux Enterprise: `startRepl` requires a valid store object')
    }

    w.dispatch = store.dispatch
    attachStateModelsToConsole(stateModels, w)

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
  StateDefinitions,
}

export {
  defineState,
  startRepl,
  clearAllState,
  reducers,
  StateDefinitions,
}
