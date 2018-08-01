import { forIn } from 'lodash'
import { Store } from 'redux'
import { Models } from '../state/storage'
import { log, logWarning, makeError, isDev, isBrowser, isTest } from '../utils'

declare var global: any
declare var window: any

export function startRepl(store: Store<{}>): Store<{}> {
  if ((isDev && isBrowser) || isTest) {
    const w = isTest ? global : window

    if (!store || !store.dispatch || !store.getState) {
      throw makeError('`startRepl` requires a valid store object')
    }

    w.store = store
    attachStateModelsToConsole(Models, w)

    if (!isTest) {
      log('starting REPL')
    }
  }
  return store
}

function attachStateModelsToConsole(models: any, w: any): void {
  if (!w) {
    logWarning('REPL cannot mount, `window` undefined')
    return
  }

  if (!w.store) {
    logWarning('REPL cannot mount, `window.store` undefined')
    return
  }

  w.Actions = {}
  w.Selectors = {}

  forIn(models, (model, key) => {
    w.Actions[key] = bindActionMap(model.actions, w.store)
    w.Selectors[key] = bindSelectorMap(model.selectors, w.store)
  })
}

function bindActionMap(actions: any, store: Store<{}>) {
  const allActions: any = {}

  forIn(actions, (val, key) => {
    if (typeof val === 'object') {
      allActions[key] = bindActionMap(val, store)
    } else {
      const action = val
      allActions[key] = (...params: any[]) => {
        const a = action(...params)
        store.dispatch(a)
        return a
      }
    }
  })

  return allActions
}

function bindSelectorMap(selectors: any, store: Store<{}>) {
  const allSelectors: any = {}

  forIn(selectors, (val, key) => {
    if (typeof val === 'object') {
      allSelectors[key] = bindSelectorMap(val, store)
    } else {
      const selector = val
      allSelectors[key] = (...params: any[]) => {
        const s = selector(store.getState(), ...params)
        return s
      }
    }
  })

  return allSelectors
}
