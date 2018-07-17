import { IDefinitionOptions, IDefinition } from '../types'
import { createModelGenerator } from './createModelGenerator'

export const createDefinition = <LocalState>({
  reducers,
  selectors,
  defaultState,
  transformInitialState,
}: IDefinition<LocalState>) => {
  const createModelGeneratorWithOptions = (options: IDefinitionOptions = {}) =>
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