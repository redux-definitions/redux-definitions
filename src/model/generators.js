/* eslint-disable */

import { createAction } from 'redux-actions'
import { forIn } from 'lodash/object'

import Collection from './types/collection'
import Flag from './types/flag'
import Setable from './types/setable'
import ToggleMap from './types/toggle-map'

export const generateReducerMap = (obj, base = '') => {
  let allReducers = {}
  let allActions = {}
  let allInitialState = {}

  forIn(obj, (val, key) => {
    const type = `${base}${key}`

    if (typeof val === 'object') {
      const {
        actions,
        reducers,
        initialState,
      } = generateReducerMap(val, `${type}/`)

      allReducers = {
        ...allReducers,
        ...reducers
      }
      allActions[key] = actions
      allInitialState[key] = initialState
    } else {
      allReducers[type] = val
      allActions[key] = createAction(type)
    }
  })

  return {
    actions: allActions,
    reducers: allReducers,
    initialState: allInitialState,
  }
}

export const generateTypeMap = (schema, namespacing) => {
  const allActions = {}
  let allReducers = {}
  const allInitialState = {}

  forIn(schema, (type, field) => {
    if(typeof type === 'object') {
      const {
        actions,
        reducers,
        initialState,
      } = generateTypeMap(type, [...namespacing, field])

      allActions[field] = actions
      allInitialState[field] = initialState
      allReducers = {
        ...allReducers,
        ...reducers,
      }
    } else {
      const {
        actions,
        reducers,
        initialState,
      } = buildType(type, [...namespacing, field])

      allActions[field] = actions
      allInitialState[field] = initialState
      allReducers = {
        ...allReducers,
        ...reducers,
      }
    }
  })

  return {
    actions: allActions,
    reducers: allReducers,
    initialState: allInitialState,
  }
}

const buildType = (type, namespacing) => {
  if (typeof type !== 'string') {
    throw Error(`CreateModel: Invalid type "${type}" for model "${params[0]}"`)
  }

  if (type === 'flag') {
    return Flag.generate(namespacing)
  }

  if (type === 'setable') {
    return Setable.generate(namespacing)
  }

  if (type === 'collection') {
    return Collection.generate(namespacing)
  }

  // if (type === 'toggleMap') {
  //   return ToggleMap.generate(namespacing)
  // }
}
