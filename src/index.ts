import { startRepl } from './repl/index'
import { clearAllReducers } from './state/clearAllReducers'
import { createDefinition } from './state/createDefinition'
import { createReducers } from './state/createReducers'
import {
  Actions,
  Models,
  Reducers,
  Selectors,
} from './state/storage'
import {
  IReducerMap,
  IDefinition,
  IModelMap,
  IRootModel,
  IActionCreatorMapsGroup,
  ISelectorMapsGroup
} from './state/types'
import Definitions from './definitions'

const reducers = Reducers

export default {
  Actions,
  Models,
  Reducers,
  Selectors,
  Definitions,
  clearAllReducers,
  createDefinition,
  createReducers,
  reducers, // backwards compatible
  startRepl,
}

export {
  Actions,
  Models,
  Reducers,
  Selectors,
  Definitions,
  clearAllReducers,
  createDefinition,
  createReducers,
  reducers, // backwards compatible
  startRepl,
}
