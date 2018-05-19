import { startRepl } from './repl'
import {
  Actions,
  Selectors,
  Models,
  Reducers,
} from './state/storage'
import { defineState } from './state/defineState'
import { clearAllState } from './state/clearAllState'
import { createStateType } from './state/createStateType'
import StateTypes from './types'

const reducers = Reducers

export default {
  defineState,
  startRepl,
  clearAllState,
  createStateType,
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
  createStateType,
  Models,
  Reducers,
  reducers, // backwards compatible
  Actions,
  Selectors,
  StateTypes,
}
