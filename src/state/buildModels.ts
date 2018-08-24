import { handleActions } from 'redux-actions'
import { makeError } from '../utils'
import { IModel, IIntermediateModel } from './types/model'
import { traverse } from './traverse'
import { ISchema, IReducerSchema } from './types/schema'

const buildModel = <ReducerSchema extends IReducerSchema>(namespace: string, schema: ReducerSchema): IModel => {
  const {
    actions,
    reducers,
    selectors,
    initialState,
  }: IIntermediateModel = traverse(schema, [namespace])

  const reducer = handleActions(reducers, initialState)

  return {
    actions,
    namespace,
    reducer,
    selectors,
  }
}

export const buildModels = (schema: ISchema) => {
  if (typeof schema !== 'object') {
    throw makeError('`createReducers` must be passed an object as first parameter')
  }

  return Object.entries(schema).map(([namespace, reducerSchema]: [string, IReducerSchema]) =>
    buildModel(namespace, reducerSchema)
  )
}

