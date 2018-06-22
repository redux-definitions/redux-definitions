import { handleActions } from 'redux-actions'
import { makeError } from '../utils'
import { IModel } from './types'
import { traverse } from './traverse'
import { IModelDefinition } from './types'

const buildModel = (namespace: string, schema: any): IModel<{}> => {
  const {
    actions,
    reducers,
    selectors,
    initialState,
  }: IModelDefinition = traverse(schema, [namespace])

  const reducer = handleActions(reducers, initialState)

  return {
    actions,
    namespace,
    reducer,
    selectors,
  }
}

export const buildModels = (schema: any) => {
  if (typeof schema !== 'object') {
    throw makeError('`createReducers` must be passed an object as first parameter')
  }

  return Object.entries(schema).map(([namespace, reducerSchema]: [string, any]) =>
    buildModel(namespace, reducerSchema)
  )
}

