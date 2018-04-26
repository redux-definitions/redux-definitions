/* eslint-disable */

import { forIn } from 'lodash/object'
import { upperFirst } from 'lodash/string'

export function attachStateModelsToConsole(models, window) {
  if (!window) {
    console.warn('Redux Enterprise: REPL cannot mount, `window` undefined')
    return
  }

  if (!window.store) {
    console.warn('Redux Enterprise: REPL cannot mount, `window.store` undefined')
    return
  }

  window.Actions = {}
  window.Selectors = {}

  forIn(models, (model, key) => {
    window.Actions[upperFirst(key)] = bindActionMap(model.actions, window.store)
    window.Selectors[upperFirst(key)] = bindSelectorMap(model.selectors, window.store)
  })
}

function bindActionMap(actions, store) {
  const allActions = {}

  forIn(actions, (val, key) => {
    if (typeof val === 'object') {
      allActions[key] = bindActionMap(val, store)
    } else {
      const action = val
      allActions[key] = (...params) => {
        const a = action(...params)
        // console.log(a)
        store.dispatch(a)
        return a
      }
    }
  })

  return allActions
}

function bindSelectorMap(selectors, store) {
  const allSelectors = {}

  forIn(selectors, (val, key) => {
    if (typeof val === 'object') {
      allSelectors[key] = bindSelectorMap(val, store)
    } else {
      const selector = val
      allSelectors[key] = (...params) => {
        const s = selector(store.getState(), ...params)
        // console.log(s)
        return s
      }
    }
  })

  return allSelectors
}
