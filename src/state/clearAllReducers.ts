import { forIn } from 'lodash'
import { Actions, Models, Reducers, Selectors } from './storage'

export const clearAllReducers = () => {
  forIn(Reducers, (_: any, key: string) => {
    delete Reducers[key]
  })

  forIn(Models, (_: any, key: string) => {
    delete Models[key]
  })

  forIn(Selectors, (_: any, key: string) => {
    delete Selectors[key]
  })

  forIn(Actions, (_: any, key: string) => {
    delete Actions[key]
  })
}

