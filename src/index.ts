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
import { IReducerMap } from './state/types/reducer'
import { IDefinition } from './state/types/definition'
import { IModelMap, IRootModel } from './state/types/model'
import { IRootActionCreatorMaps } from './state/types/actionCreator'
import { IRootSelectorMaps } from './state/types/selector'
import { ISchema } from './state/types/schema'
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
