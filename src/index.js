import { createModel, Models, reducers } from './model'
import {
  attachModelsToConsole as attachModelsToConsoleUnbound
} from './console'

const attachModelsToConsole = () =>
  attachModelsToConsoleUnbound(Models)

export default {
  reducers,
  Models,
  createModel,
  attachModelsToConsole,
}

export {
  reducers,
  Models,
  createModel,
  attachModelsToConsole,
}
