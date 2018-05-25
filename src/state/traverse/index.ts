import { forIn } from 'lodash'
import { makeError } from 'utils'
import { Model } from './model'
import { IModelDefinition, IModelFunction } from './types'
import { isReducerDefinition } from '../utils'
import { isFunction, isObject } from 'util'

export const traverse = (schema: any, namespacing: string[]): IModelDefinition => {
  let rootModel: IModelDefinition = {
    kind: 'definition',
    actions: {},
    initialState: {},
    reducers: {},
    selectors: {},
  }

  if (isReducerDefinition(schema)) {
    const reducerDefinition = schema

    rootModel = {
      ...rootModel,
      ...Model.fromDefinition(reducerDefinition, namespacing, true)
    }
  } else if (isFunction(schema)) {
    throw makeError('Reducer cannot be function')
  } else {
    forIn(schema, (value, field) => {
      let model: IModelDefinition|IModelFunction
      if (isReducerDefinition(value)) {
        model = Model.fromDefinition(value, [...namespacing, field])
      } else if (isObject(value)) {
        model = traverse(value, [...namespacing, field])
      } else if (isFunction(value)) {
        model = Model.fromFunction(value, [...namespacing, field])
      } else {
        throw Error(
          `Redux Enterprise: Invalid schema at '${namespacing.join('.')}': ${value}`
        )
      }
      rootModel = Model.update(rootModel, field, model)
    })
  }

  return rootModel
}
