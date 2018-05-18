import { startRepl } from './repl'
import {
  Actions,
  Selectors,
  Models,
  Reducers,
} from './state/storage'
import { defineState } from './state/defineState'
import { clearAllState } from './state/clearAllState'
import StateTypes from './state/types'

const reducers = Reducers

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
