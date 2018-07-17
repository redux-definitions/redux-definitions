import { forIn } from 'lodash'
import { makeError } from '../../utils'
import { Model } from './model'
import { IModelDefinition, IModelFunction, ITopModel } from '../types'
import { isReducerDefinition, isFunction, isObject } from '../utils'

export const traverse = (schema: any, namespacing: string[]): ITopModel => {
  let rootModel: ITopModel = {
    actions: {},
    initialState: {},
    reducers: {},
    selectors: {},
  }

  if (isReducerDefinition(schema)) {
    // const reducerDefinition = schema

    // rootModel = {
    //   ...rootModel,
    //   ...Model.fromDefinition(reducerDefinition, namespacing, true)
    // }
    throw makeError('Reducer cannot be definition')
  } else if (isFunction(schema)) {
    throw makeError('Reducer cannot be function')
  } else {
    forIn(schema, (value, field) => {
      let model: IModelDefinition
      if (isReducerDefinition(value)) {
        model = Model.fromDefinition(value, [...namespacing, field])
      } else if (isObject(value)) {
        // model = traverse(value, [...namespacing, field])
        throw makeError('Reducer key cannot be object')
      } else if (isFunction(value)) {
        // model = Model.fromFunction(value, [...namespacing, field])
        throw makeError('Reducer key cannot be function')
      } else {
        throw makeError(`Reducer key invalid at '${namespacing.join('.')}': ${value}`)
      }
      rootModel = Model.update(rootModel, field, model)
    })
  }

  return rootModel
}
