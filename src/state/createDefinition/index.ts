import { IInvokeDefinitionOptions, ICreateDefinition, ReducerDefinition } from 'state/types/definition'
import { createModelGenerator } from './createModelGenerator'
import { ISelectorMap } from '../types/selector'
import { IModelDefinition } from '../types/model'

export const createDefinition = <LocalState, SelectorMap extends ISelectorMap<{}>>({
  reducers,
  selectors,
  defaultState,
  transformInitialState,
}: ICreateDefinition<LocalState, SelectorMap>): ReducerDefinition => {
  const createModelGeneratorWithOptions = (options: IInvokeDefinitionOptions = {}) =>
    createModelGenerator<LocalState>({
      reducerMap: reducers,
      defaultState,
      options,
      selectorMap: selectors,
      transformInitialState,
    })

  const Type = (options?: IInvokeDefinitionOptions) => ({
    generate: createModelGeneratorWithOptions(options)
  })

  // Type.generate = createModelGeneratorWithOptions()

  return Type
}