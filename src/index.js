import { createModel as createModelO } from './model'
import { attachModelsToConsole as attachModelsToConsoleO } from './console'

const models = {}
const reducers = {}

const createModel = (schema) =>
  createModelO(schema).map(model => {
    models[model.namespace] = model
    reducers[model.namespace] = model.reducer
    return model
  })

const attachModelsToConsole = () =>
  attachModelsToConsoleO(models, global)

export default {
  createModel,
  attachModelsToConsole,
  models,
  reducers,
}

export {
  createModel,
  attachModelsToConsole,
  models,
  reducers,
}
