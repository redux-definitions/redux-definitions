import { forIn } from 'lodash/object'

export function attachStateModelsToConsole(models, window) {
  if (!window) {
    console.warn('Redux Enterprise: REPL cannot mount, `window` undefined') // eslint-disable-line
    return
  }

  if (!window.store) {
    console.warn('Redux Enterprise: REPL cannot mount, `window.store` undefined') // eslint-disable-line
    return
  }

  window.Actions = {} // eslint-disable-line
  window.Selectors = {} // eslint-disable-line

  forIn(models, (model, key) => {
    window.Actions[key] = bindActionMap(model.actions, window.store) // eslint-disable-line
    window.Selectors[key] = bindSelectorMap(model.selectors, window.store) // eslint-disable-line
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
        return s
      }
    }
  })

  return allSelectors
}
