import { startRepl } from './repl'
import {
  defineState,
  clearAllState,
  Actions,
  Selectors,
  Models,
  Reducers,
} from './state'
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
