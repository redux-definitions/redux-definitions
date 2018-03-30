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

  forIn(obj, (val, key) => {
    const type = `${base}${key}`

    if (typeof val === 'object') {
      const { actions, reducers } = generateReducerMap(val, `${type}/`)

      allReducers = {
        ...allReducers,
        ...reducers
      }
      allActions[key] = actions
    } else {
      allReducers[type] = val
      allActions[key] = createAction(type)
    }
  })

  return {
    actions: allActions,
    reducers: allReducers,
  }
}

export const generateTypeMap = (schema, namespace) => {
  const allActions = {}
  let allReducers = {}

  forIn(schema, (type, field) => {
    if(typeof type === 'object') {
      const { actions, reducers } = generateTypeMap(type, `${namespace}${field}/`)
      allActions[field] = actions
      allReducers = {
        ...allReducers,
        ...reducers,
      }
    } else {
      const { actions, reducers } = buildType(type, namespace, field)
      allActions[field] = actions
      allReducers = {
        ...allReducers,
        ...reducers,
      }
    }
  })

  return  { actions: allActions, reducers: allReducers }
}

const buildType = (type, ...params) => {
  if (typeof type !== 'string') {
    throw Error(`CreateModel: Invalid type "${type}" for model "${params[0]}"`)
  }

  if (type === 'flag') {
    return Flag.generate(...params)
  }

  if (type === 'setable') {
    return Setable.generate(...params)
  }

  if (type === 'collection') {
    return Collection.generate(...params)
  }

  // if (type === 'toggleMap') {
  //   return ToggleMap.generate(...params)
  // }
}
