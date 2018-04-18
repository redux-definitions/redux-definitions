import { createModel } from './model'
import { attachModelsToConsole } from './console'

const models = {}
const reducers = {}

const isTest = process.env.NODE_ENV === 'test'

const defineState = (schema) =>
  createModel(schema).map(model => {
    models[model.namespace] = model
    reducers[model.namespace] = model.reducer
    return model
  })

const startRepl = (store) => {
  if ((process && process.title === 'browser') || isTest) {
    const w = isTest ? global : window
    if (!store || !store.dispatch) {
      throw Error('Redux Enterprise: `startRepl` requires a valid store object')
    }
    w.dispatch = store.dispatch
    attachModelsToConsole(models, w)

    if(!isTest) {
      console.log('Redux Enterprise: starting REPL')
    }
  }
  return store
}

export default {
  defineState,
  startRepl,
  models,
  reducers,
}

export {
  defineState,
  startRepl,
  models,
  reducers,
}
