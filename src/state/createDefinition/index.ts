import { IInvokeDefinitionOptions, ICreateDefinition } from 'state/types/definition'
import { createModelGenerator } from './createModelGenerator'

export const createDefinition = <LocalState>({
  reducers,
  selectors,
  defaultState,
  transformInitialState,
}: ICreateDefinition<LocalState>) => {
  const createModelGeneratorWithOptions = (options: IInvokeDefinitionOptions = {}) =>
    createModelGenerator<LocalState>({
      reducerMap: reducers,
      defaultState,
      options,
      selectorMap: selectors,
      transformInitialState,
    })

  const Type: any = (options: any) => ({
    generate: createModelGeneratorWithOptions(options)
  })

  Type.generate = createModelGeneratorWithOptions()

  return Type
}