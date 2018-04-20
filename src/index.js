import { forIn } from 'lodash/object'
import { createState } from './state'
import { attachStateModelsToConsole } from './console'
import { Collection, Flag, Setable } from './state/definitions'

const stateModels = {}
const reducers = {}

const isTest = process.env.NODE_ENV === 'test'

const defineState = (schema) =>
  createState(schema).map(model => {
    stateModels[model.namespace] = model
    reducers[model.namespace] = model.reducer
    return model
  })

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

const StateDefinitions = {
  Collection,
  Flag,
  Setable,
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
