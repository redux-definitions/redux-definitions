import { forIn } from 'lodash/object'
import { Actions, Models, Selectors, Reducers } from './storage'

export const clearAllState = () => {
  forIn(Reducers, (_, key) => {
    delete Reducers[key]
  })

  forIn(Models, (_, key) => {
    delete Models[key]
  })

  forIn(Selectors, (_, key) => {
    delete Selectors[key]
  })

  forIn(Actions, (_, key) => {
    delete Actions[key]
  })
}

