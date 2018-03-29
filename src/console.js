/* eslint-disable */

import { combineReducers } from 'redux'
import { forIn, mapValues } from 'lodash/object'
import { upperFirst } from 'lodash/string'

const window = global

export function attachModelsToConsole(models) {
  if (!window) {
    return
  }

  window.re = {}

  const reducers = {}
  const actions = {}

  forIn(models, (model, name) => {
    const n = upperFirst(name)

    // reducer
    reducers[name] = model.reducer

    // actions
    actions[n] = model.actions
    window[n] = mapValues(model.actions, (action) => {
      // make traversing objects generic
      if (typeof action === 'object') {
        return mapValues(action, (action) => {
          return (...params) => {
            const a = action(...params)
            console.log(a)
            window.dispatch(a)
          }
        })
      }

      return (...params) => {
        const a = action(...params)
        console.log(a)
        window.dispatch(a)
      }
    })
  })

  return {
    reducers,
    actions,
  }
}
