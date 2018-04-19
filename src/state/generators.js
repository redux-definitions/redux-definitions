/* eslint-disable */

import { createAction } from 'redux-actions'
import { forIn } from 'lodash/object'
import { Collection, Flag, Setable } from './definitions'

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
