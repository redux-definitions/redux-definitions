import { makeScope } from '../makeScope'
import { ICompiledDefinition } from 'state/types/definition'
import {
  IModelFunction,
  IModelDefinition,
  IIntermediateModel
} from 'state/types/model'
import { getActionType } from '../utils'
import { ISelectorMap } from '../types/selector'

export const Model = {
  fromDefinition: <LocalState, Selectors extends ISelectorMap<LocalState>>(compiledDefinition: ICompiledDefinition<LocalState, Selectors>, namespacing: string[], topLevel?: boolean): IModelDefinition<LocalState, Selectors> => ({
    kind: 'definition',
    ...compiledDefinition.generate(namespacing, topLevel || false),
  }),
  fromFunction: (fn: any, namespacing: string[], topLevel?: boolean): IModelFunction => {
    if (topLevel) {
      throw Error('Redux Enterprise: Reducer Definition custom functions cannot be used at the reducer top level.')
    }

    const type = getActionType(namespacing)
    const { reducer, action } = makeScope(namespacing, true)(type, fn)
    return {
      kind: 'function',
      action,
      reducers: {
        [type]: reducer
      },
    }
  },
  update: <LocalState, Selectors extends ISelectorMap<LocalState>>(rootModel: IIntermediateModel, field: string, model: IModelDefinition<LocalState, Selectors>): IIntermediateModel => {
    // if (model.kind === 'definition') {
      const { actions, initialState, reducers, selectors } = model
      return {
        ...rootModel,
        reducers: {
          ...rootModel.reducers,
          ...reducers,
        },
        actions: {
          ...rootModel.actions,
          [field]: actions,
        },
        selectors: {
          ...rootModel.selectors,
          [field]: selectors,
        },
        initialState: {
          ...rootModel.initialState,
          [field]: initialState,
        },
      }
    // }
    // if (model.kind === 'function') {
    //   const { action, reducers } = model
    //   return {
    //     ...rootModel,
    //     reducers: {
    //       ...rootModel.reducers,
    //       ...reducers,
    //     },
    //     actions: {
    //       ...rootModel.actions,
    //       [field]: action
    //     }
    //   }
    // }

    // return rootModel
  }
}