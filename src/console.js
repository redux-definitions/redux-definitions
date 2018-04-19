/* eslint-disable */

import { forIn } from 'lodash/object'
import { upperFirst } from 'lodash/string'

export function attachStateModelsToConsole(models, window) {
  if (!window) {
    console.warn('Redux Enterprise: REPL cannot mount, `window` undefined')
    return
  }

  if (!window.dispatch) {
    console.warn('Redux Enterprise: REPL cannot mount, `window.dispatch` undefined')
    return
  }

  forIn(models, (model, key) => {
    window[upperFirst(key)] = bindActionMap(model.actions, window.dispatch)
  })
}

function bindActionMap(actions, dispatch) {
  const allActions = {}

  forIn(actions, (val, key) => {

    if (typeof val === 'object') {
      allActions[key] = bindActionMap(val, dispatch)
    } else {
      const action = val
      allActions[key] = (...params) => {
        const a = action(...params)
        // console.log(a)
        dispatch(a)
        return a
      }
    }
  })

  return allActions
}
