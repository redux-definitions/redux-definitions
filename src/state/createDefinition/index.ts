import { IInvokeDefinitionOptions, ICreateDefinition, ReducerDefinition, ICompiledDefinition, DefinitionGenerator } from 'state/types/definition'
import { createModelGenerator } from './createModelGenerator'
import { ISelectorMap } from '../types/selector'
import { IModelDefinition } from '../types/model'

export const createDefinition = <LocalState, Selectors extends ISelectorMap<LocalState>>({
  reducers,
  selectors,
  defaultState,
  transformInitialState,
}: ICreateDefinition<LocalState, Selectors>): ReducerDefinition<LocalState, Selectors> => {
  const createModelGeneratorWithOptions = (options: IInvokeDefinitionOptions = {}): DefinitionGenerator<LocalState, Selectors> =>
    createModelGenerator<LocalState, Selectors>({
      reducerMap: reducers,
      defaultState,
      options,
      selectorMap: selectors,
      transformInitialState,
    })

  const Type: ReducerDefinition<LocalState, Selectors> = (options = {}) => ({
    generate: createModelGeneratorWithOptions(options)
  })

  // Type.generate = createModelGeneratorWithOptions()

  return Type
}