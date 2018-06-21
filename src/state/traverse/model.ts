import { Action, ActionFunction1, ReducerMap } from 'redux-actions'
import { createAction } from 'redux-actions'
import { makeScope } from '../../state/algorithms/makeScope'
import { ActionCreator, IActionCreatorMap, ISelectorMap } from '../../state/types'
import { IReducerDefinition, IModelFunction, IModelDefinition } from '../../state/traverse/types'
import { getActionType } from '../utils'

export const Model = {
  fromDefinition: (reducerDefinition: IReducerDefinition, namespacing: string[], topLevel?: boolean): IModelDefinition => ({
    kind: 'definition',
    ...reducerDefinition.generate(namespacing, topLevel),
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
  update: (rootModel: IModelDefinition, field: string, model: IModelDefinition|IModelFunction) => {
    if (model.kind === 'definition') {
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
    }
    if (model.kind === 'function') {
      const { action, reducers } = model
      return {
        ...rootModel,
        reducers: {
          ...rootModel.reducers,
          ...reducers,
        },
        actions: {
          ...rootModel.actions,
          [field]: action
        }
      }
    }

    return rootModel
  }
}