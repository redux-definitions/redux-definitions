/* eslint-disable */

import { createAction } from 'redux-actions'
import { forIn } from 'lodash/object'
import { Collection, Flag, Setable } from './definitions'

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
  let allActions = {}
  let allReducers = {}
  let allInitialState = {}

  if (typeof schema === 'string') {
    const type = schema

    const {
      actions,
      reducers,
      initialState,
    } = buildType(type, namespacing, true)

    allActions = actions
    allInitialState = initialState
    allReducers = reducers
  } else {
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
  }

  return {
    actions: allActions,
    reducers: allReducers,
    initialState: allInitialState,
  }
}

const buildType = (type, namespacing, topLevel) => {
  if (typeof type !== 'string') {
    throw Error(`CreateModel: Invalid type "${type}" for model "${params[0]}"`)
  }

  const stateDefinitionMap = {
    flag: Flag,
    setable: Setable,
    collection: Collection,
  }

  const StateDefinitionFactory = stateDefinitionMap[type]

  if (!StateDefinitionFactory) {
    throw Error('Redux Enterprise: No valid state definition `type`')
  }

  return StateDefinitionFactory.generate(namespacing, topLevel)
}
