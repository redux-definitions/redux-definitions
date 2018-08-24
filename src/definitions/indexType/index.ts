import { find, uniq, without } from 'lodash'
import { Action } from 'redux-actions'
import { createDefinition } from '../../state/createDefinition'
import { isArray } from 'lodash'

interface IState {
  index: string[]
}

export default createDefinition<IState>({
  reducers: {
    add: (state: IState, { payload }: Action<string|string[]>): IState => {
      if (!payload) {
        return state
      }

      const arr = isArray(payload)
        ? [...state.index, ...payload]
        : [...state.index, payload]

      return {
        index: uniq(arr)
      }
    },
    remove: (state: IState, { payload }: Action<string|string[]>): IState => {
      if (!payload) {
        return state
      }

      const index = isArray(payload)
        ? without.apply(null, [state.index, ...payload])
        : without(state.index, payload)

      return {
        index
      }
    },
    reset: () => ({
      index: []
    }),
    set: (state: IState, { payload }: Action<string[]>): IState => {
      if (!payload) {
        return state
      }

      return {
        index: payload
      }
    },
    toggle: (state: IState, { payload }: Action<string>): IState => {
      if (!payload) {
        return state
      }

      const found = find(state.index, (e: any) => e === payload)
      return {
        index: found
          ? without(state.index, payload)
          : uniq([...state.index, payload])
      }
    },
  },
  defaultState: { index: [] },
  selectors: {
    get: (state: IState): string[] => state.index,
    includes: (state: IState, params: { id: string }|undefined = undefined): boolean =>
      params && params.id ? state.index.includes(params.id) : false,
    count: (state: IState): number => state.index.length,
  },
  transformInitialState: (initialState: string[]): IState => ({
    index: initialState
  })
})

