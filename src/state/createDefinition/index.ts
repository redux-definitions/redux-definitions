import { ISelectorMap } from 'state/types'
import { createModelGenerator, DefinitionReducerMap } from './createModelGenerator'

export interface IDefiniton<State> {
  actions: DefinitionReducerMap<State>
  selectors: ISelectorMap<State>
  defaultState: State
  transformInitialState?: (initialState: any) => State
}

export const createDefinition = <State>({
  actions,
  selectors,
  defaultState,
  transformInitialState,
}: IDefiniton<State>) => {
  const createModelGeneratorWithOptions = (options: {} = {}) =>
    createModelGenerator<State>({
      actionFns: actions,
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