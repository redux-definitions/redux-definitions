import { createAction } from 'redux-actions'

import Collection from './types/collection'
import Flag from './types/flag'
import Setable from './types/setable'
import ToggleMap from './types/toggle-map'

export const generateReducerMap = (obj, base = '') => {
  let reducers = {}

  for(let i in obj) {
    const type = `${base}${i}`

    if(typeof obj[i] === 'object'){
      reducers = {
        ...reducers,
        ...generateReducerMap(obj[i], `${type}/`)
      }
    } else {
      reducers[type] = obj[i]
    }
  }

  return reducers
}

export const generateActionMap = (obj, base = '') => {
  let actions = {}

  for(let i in obj) {
    const type = `${base}${i}`

    if(typeof obj[i] === 'object'){
      actions[i] = generateActionMap(obj[i], `${type}/`)
    } else {
      actions[i] = createAction(type)
    }
  }

  return actions
}


export const generateTypeMap = (schema, namespace, actions, reducerFns) => {
  for(let field in schema) {
    const type = schema[field]

    if(typeof type === 'object') {
      actions[field] = generateTypeMap(type, `${namespace}${field}/`, actions, reducerFns)
    } else {
      actions[field] = buildType(type, namespace, field, actions, reducerFns)
    }
  }

  return actions
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

  if (type === 'toggleMap') {
    return ToggleMap.generate(...params)
  }
}
