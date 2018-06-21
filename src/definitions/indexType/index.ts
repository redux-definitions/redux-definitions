import { find, uniq, without } from 'lodash'
import { Action } from 'redux-actions'
import { createDefinition } from 'state/createDefinition'

interface IState {
  index: string[]
}

export default createDefinition<IState>({
  reducers: {
    add: (state: IState, { payload }: Action<string>): IState => {
      if (!payload) {
        return state
      }

      return {
        index: uniq([...state.index, payload])
      }
    },
    remove: (state: IState, { payload }: Action<string>): IState => {
      if (!payload) {
        return state
      }

      return {
        index: without(state.index, payload)
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
    includes: (state: IState, { id }: { id: string }): boolean => state.index.includes(id),
  },
  transformInitialState: (initialState: string[]): IState => ({
    index: initialState
  })
})

