import { forIn } from 'lodash'
import { makeError } from '../../utils'
import { Model } from './model'
import { IIntermediateModel } from 'state/types/model'
import { isReducerDefinition, isFunction } from '../utils'
import { IReducerSchema } from 'state/types/schema'

export const traverse = <ReducerSchema extends IReducerSchema>(schema: ReducerSchema, namespacing: string[]): IIntermediateModel => {
  let rootModel: IIntermediateModel = {
    actions: {},
    initialState: {},
    reducers: {},
    selectors: {},
  }

  if (isReducerDefinition(schema)) {
    throw makeError('Reducer cannot be definition')
  } else if (isFunction(schema)) {
    throw makeError('Reducer cannot be function')
  }

  forIn(schema, (value, field) => {
    if (isReducerDefinition(value)) {
      const model = Model.fromDefinition(value, [...namespacing, field])
      rootModel = Model.update(rootModel, field, model)
    } else {
      throw makeError(`Invalid reducer definition at '${namespacing.join('.')}'`)
    }
  })
  

  return rootModel
}