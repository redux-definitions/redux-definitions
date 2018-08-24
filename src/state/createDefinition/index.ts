import {
  IInvokeDefinitionOptions,
  ICreateDefinition,
  IReducerDefinition,
  ICompiledDefinition,
  DefinitionGenerator
} from '../types/definition'
import { createModelGenerator } from './createModelGenerator'
import { ISelectorMap } from '../types/selector'
import { IModelDefinition } from '../types/model'

export const createDefinition = <LocalState>({
  reducers,
  selectors,
  defaultState,
  transformInitialState,
}: ICreateDefinition<LocalState>): IReducerDefinition => {
  const createModelGeneratorWithOptions = (options: IInvokeDefinitionOptions = {}) =>
    createModelGenerator<LocalState>({
      reducerMap: reducers,
      defaultState,
      options,
      selectorMap: selectors,
      transformInitialState,
    })

  const reducerDefinition: any = (options = {}) => ({
    generate: createModelGeneratorWithOptions(options)
  })
  reducerDefinition.generate = createModelGeneratorWithOptions()

  return reducerDefinition
}