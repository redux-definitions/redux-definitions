import { ISelectorMap } from 'state/types'
import { createModelGenerator, DefinitionReducerMap } from './createModelGenerator'

export interface IDefinition<State> {
  reducers: DefinitionReducerMap<State>
  selectors: ISelectorMap<State>
  defaultState: State
  transformInitialState?: (initialState: any) => State
}

export const createDefinition = <State>({
  reducers,
  selectors,
  defaultState,
  transformInitialState,
}: IDefinition<State>) => {
  const createModelGeneratorWithOptions = (options: {} = {}) =>
    createModelGenerator<State>({
      reducerFns: reducers,
      defaultState,
      options,
      selectorFns: selectors,
      transformInitialState,
    })

  const Type: any = (options: any) => ({
    generate: createModelGeneratorWithOptions(options)
  })

  Type.generate = createModelGeneratorWithOptions()

  return Type
}